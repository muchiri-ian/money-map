"""
EADA Pipeline — The Money Map (Release 1)
The Overlooked Athlete Economy | Ian Muchiri | July 2026

WHAT THIS DOES
Turns raw EADA survey downloads (U.S. Dept. of Education, Equity in
Athletics Disclosure Act) into three clean, publish-ready tables:

  1. institutions_clean.csv   — one row per school per year, standardized
  2. division_summary.csv     — recruiting spend + aid by division per year
  3. school_lookup.csv        — feeds the site's interactive school lookup

WORKFLOW (three commands, in order)
  Step 0 (manual, ~2 min): download data
     Go to https://ope.ed.gov/athletics/#/datafile/list
     Download the ZIP for each survey year you want (recommended: 2024,
     2019, 2015). Do NOT unzip. Drop the zips into:  data/raw/

  Step 1:  python eada_pipeline.py inspect
     Lists every file inside each zip + prints the column-mapping report.
     If any field shows UNRESOLVED, paste the report back to Claude and
     the FIELD_PATTERNS/MANUAL_OVERRIDES get fixed in one edit.

  Step 2:  python eada_pipeline.py all
     Runs clean + summarize + draft charts. Outputs land in data/clean/
     and charts/.

REQUIREMENTS
  python 3.9+ ;  pip install pandas openpyxl matplotlib

DESIGN NOTES (why it's built this way)
  - EADA variable names drift across survey years, so nothing is
    hardcoded: fields are found by regex pattern, the chosen mapping is
    printed for human verification, and MANUAL_OVERRIDES wins if set.
  - Every filter/exclusion is logged and counted — the methodology page
    reports these numbers (Knight-Newhouse does the same; it's the
    credible norm).
  - Charts here are DRAFTS for design reference, not final site art.
"""

# NOTE: this import makes modern type-hint syntax (e.g. `Path | None`)
# work on Python 3.9, which is what this machine runs. Must stay first.
from __future__ import annotations

import argparse
import re
import sys
import zipfile
from pathlib import Path

import pandas as pd

# ----------------------------------------------------------------------
# CONFIG
# ----------------------------------------------------------------------
RAW_DIR = Path("data/raw")        # put downloaded EADA zips here
INTERIM_DIR = Path("data/interim")
CLEAN_DIR = Path("data/clean")
CHART_DIR = Path("charts")

# Fields we need, each with regex patterns tried IN ORDER against the
# institution-level table's columns (case-insensitive). First match wins.
FIELD_PATTERNS = {
    "unitid":            [r"^unitid$", r"unit.*id"],
    "institution":       [r"^institution.*name", r"^instnm", r"institution"],
    "state":             [r"^state.*cd", r"^state$", r"^stabbr"],
    "sector":            [r"sector.*name", r"^sector"],
    "classification":    [r"classification.*name", r"^classification(?!.*other)", r"class.*code"],
    "classification_other": [r"classification.*other"],
    # enrollment (full-time equivalent / headcount varies by year)
    "enroll_total":      [r"^ef.*total", r"total.*enroll"],
    # unduplicated participation counts (athletes) — EADA's correct total-
    # athletes fields. Exact match tried first so this can't accidentally
    # grab a sport-specific or coed-only column instead.
    "partic_men":        [r"^undup_ct_partic_men$", r"partic.*men(?!.*women)(?!.*coed)", r"male.*partic"],
    "partic_women":      [r"^undup_ct_partic_women$", r"partic.*women(?!.*coed)", r"female.*partic"],
    # no single "total" column exists in EADA; partic_total is computed
    # downstream as partic_men + partic_women (see stage_clean fallback).
    # recruiting expenses — the star of Release 1
    "recruit_men":       [r"recruit.*men(?!.*women)"],
    "recruit_women":     [r"recruit.*women"],
    "recruit_total":     [r"recruit.*total", r"total.*recruit"],
    # athletically related student aid
    "aid_men":           [r"(student.?aid|athl.*aid).*men(?!.*women)"],
    "aid_women":         [r"(student.?aid|athl.*aid).*women"],
    "aid_total":         [r"(student.?aid|athl.*aid).*total", r"total.*(student.?aid|athl.*aid)"],
    # grand totals for context
    "revenue_total":     [r"grnd.*total.*revenue", r"grand.*total.*revenue", r"total.*revenue"],
    "expense_total":     [r"grnd.*total.*expense", r"grand.*total.*expense", r"total.*expense"],
}

# If auto-detection picks wrong for a given year, hard-set it here after
# running `inspect`, e.g. {"2019": {"recruit_total": "RECRUITEXP_TOTAL"}}
MANUAL_OVERRIDES: dict[str, dict[str, str]] = {}

# Map EADA classification text -> the division buckets used on the site.
# Checked top-to-bottom; first regex hit wins.
DIVISION_BUCKETS = [
    (r"NCAA.*Division I-?FBS|I-?A\b",          "NCAA D1 (FBS)"),
    (r"NCAA.*Division I-?FCS|I-?AA\b",         "NCAA D1 (FCS)"),
    (r"NCAA.*Division I\b(?!I)",               "NCAA D1 (No Football)"),
    (r"NCAA.*Division II",                     "NCAA D2"),
    (r"NCAA.*Division III",                    "NCAA D3"),
    (r"NAIA",                                  "NAIA"),
    (r"NJCAA|junior college|two.?year|CCCAA|community college", "2-Year (JUCO)"),
    (r".*",                                    "Other"),
]


# ----------------------------------------------------------------------
# HELPERS
# ----------------------------------------------------------------------
def log(msg: str) -> None:
    print(f"[eada] {msg}")


def year_from_name(path: Path) -> str:
    """Pull the first 4-digit year out of a name like EADA_2024-2025.zip
    or a folder named 'EADA All Data Combined 2014-2015_SAS_SPSS_EXCEL'."""
    m = re.search(r"(20\d{2})", path.name)
    return m.group(1) if m else path.stem


def extract_zip(zip_path: Path) -> Path:
    out = INTERIM_DIR / year_from_name(zip_path)
    out.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(zip_path) as z:
        z.extractall(out)
    return out


def get_raw_sources() -> list[Path]:
    """
    Return one folder per EADA source year, ready to search for a table.
    Handles two cases found in data/raw/:
      - a .zip file           -> extracted into data/interim/<year>/
      - an already-unzipped folder (common when a browser auto-extracts
        on download) -> used directly, no extraction needed.
    """
    sources = []
    for p in sorted(RAW_DIR.iterdir()):
        if p.is_dir():
            sources.append(p)  # already extracted, e.g. by the browser
        elif p.suffix.lower() == ".zip":
            sources.append(extract_zip(p))
    return sources


def find_institution_table(folder: Path) -> Path | None:
    """
    EADA zips contain an institution-level ("Schools") table plus
    sport-level tables and a docs file. We want the institution table.
    Heuristic: prefer files whose name mentions 'school'/'inst';
    otherwise take the widest table.
    """
    candidates = [p for p in folder.rglob("*") if p.suffix.lower() in (".csv", ".xlsx", ".xls")]
    if not candidates:
        return None
    named = [p for p in candidates if re.search(r"school|inst", p.name, re.I)]
    pool = named or candidates

    def width(p: Path) -> int:
        try:
            df = read_any(p, nrows=5)
            return df.shape[1]
        except Exception:
            return -1

    return max(pool, key=width)


def read_any(path: Path, nrows: int | None = None) -> pd.DataFrame:
    if path.suffix.lower() == ".csv":
        return pd.read_csv(path, nrows=nrows, low_memory=False, encoding_errors="replace")
    return pd.read_excel(path, nrows=nrows)


def resolve_columns(df: pd.DataFrame, year: str) -> tuple[dict, list]:
    """Regex-match FIELD_PATTERNS against actual columns. Returns mapping + report lines."""
    mapping, report = {}, []
    overrides = MANUAL_OVERRIDES.get(year, {})
    for field, patterns in FIELD_PATTERNS.items():
        if field in overrides:
            mapping[field] = overrides[field]
            report.append(f"  {field:22s} -> {overrides[field]}   (manual override)")
            continue
        hit = None
        for pat in patterns:
            matches = [c for c in df.columns if re.search(pat, str(c), re.I)]
            if matches:
                hit = matches[0]
                break
        if hit:
            mapping[field] = hit
            report.append(f"  {field:22s} -> {hit}")
        else:
            report.append(f"  {field:22s} -> UNRESOLVED  <-- fix via MANUAL_OVERRIDES")
    return mapping, report


def to_number(series: pd.Series) -> pd.Series:
    """Coerce '$1,234' / '1,234' / blanks to floats."""
    return pd.to_numeric(
        series.astype(str).str.replace(r"[$,]", "", regex=True).str.strip(),
        errors="coerce",
    )


def bucket_division(row) -> str:
    text = f"{row.get('classification', '')} {row.get('classification_other', '')}"
    for pat, label in DIVISION_BUCKETS:
        if re.search(pat, str(text), re.I):
            return label
    return "Other"


# ----------------------------------------------------------------------
# STAGES
# ----------------------------------------------------------------------
def stage_inspect() -> None:
    folders = get_raw_sources()
    if not folders:
        log(f"Nothing found in {RAW_DIR}/ — put EADA zip files or already-extracted "
            f"EADA folders there first.")
        sys.exit(1)
    for folder in folders:
        year = year_from_name(folder)
        log(f"=== {folder.name}  (year detected: {year}) ===")
        for p in sorted(folder.rglob("*")):
            if p.is_file():
                log(f"   contains: {p.relative_to(folder)}")
        table = find_institution_table(folder)
        if table is None:
            log("   !! no data table found — check the zip contents above")
            continue
        df = read_any(table, nrows=50)
        log(f"   institution table guess: {table.name}  ({df.shape[1]} columns)")
        _, report = resolve_columns(df, year)
        log("   column mapping report:")
        print("\n".join(report))
        print()
    log("If every field resolved sensibly, run:  python eada_pipeline.py all")
    log("If anything says UNRESOLVED or looks wrong, send this report back for a one-line fix.")


def stage_clean() -> pd.DataFrame:
    folders = get_raw_sources()
    if not folders:
        log(f"Nothing found in {RAW_DIR}/")
        sys.exit(1)
    CLEAN_DIR.mkdir(parents=True, exist_ok=True)
    frames = []
    for folder in folders:
        year = year_from_name(folder)
        table = find_institution_table(folder)
        if table is None:
            log(f"!! {year}: no institution table found — skipped")
            continue
        raw = read_any(table)
        mapping, report = resolve_columns(raw, year)
        log(f"{year}: using {table.name} ({len(raw)} rows). Mapping:")
        print("\n".join(report))

        df = pd.DataFrame({f: raw[c] for f, c in mapping.items() if c in raw.columns})
        df["year"] = int(year)

        for col in [c for c in df.columns if c.startswith(("partic", "recruit", "aid", "revenue", "expense", "enroll"))]:
            df[col] = to_number(df[col])

        # participation fallback: total = men + women when total missing
        if "partic_total" not in df or df["partic_total"].isna().all():
            df["partic_total"] = df.get("partic_men", 0).fillna(0) + df.get("partic_women", 0).fillna(0)

        df["division"] = df.apply(bucket_division, axis=1)

        # --- filters (all logged; these counts go on the methodology page)
        n0 = len(df)
        df = df[df["partic_total"].fillna(0) > 0]
        log(f"{year}: dropped {n0 - len(df)} rows with zero/missing athletes (kept {len(df)})")
        zero_recruit = int((df["recruit_total"].fillna(0) == 0).sum()) if "recruit_total" in df else -1
        log(f"{year}: note — {zero_recruit} schools report $0 recruiting (kept; excluded from medians)")

        df["recruit_per_athlete"] = df["recruit_total"] / df["partic_total"]
        df["aid_per_athlete"] = df.get("aid_total") / df["partic_total"]
        frames.append(df)

    combined = pd.concat(frames, ignore_index=True)
    combined.to_csv(CLEAN_DIR / "institutions_clean.csv", index=False)
    log(f"wrote {CLEAN_DIR/'institutions_clean.csv'}  ({len(combined)} rows, {combined['year'].nunique()} years)")
    return combined


def stage_summarize(df: pd.DataFrame) -> None:
    nz = df[df["recruit_total"].fillna(0) > 0].copy()  # medians exclude $0 reporters
    summary = (
        nz.groupby(["year", "division"])
        .agg(
            schools=("institution", "count"),
            athletes=("partic_total", "sum"),
            recruit_total_sum=("recruit_total", "sum"),
            recruit_median=("recruit_total", "median"),
            recruit_per_athlete_median=("recruit_per_athlete", "median"),
            aid_per_athlete_median=("aid_per_athlete", "median"),
        )
        .reset_index()
    )
    # share of all recruiting dollars captured by each division, per year
    summary["recruit_share_of_year"] = summary["recruit_total_sum"] / summary.groupby("year")[
        "recruit_total_sum"
    ].transform("sum")
    summary.to_csv(CLEAN_DIR / "division_summary.csv", index=False)
    log(f"wrote {CLEAN_DIR/'division_summary.csv'}")

    latest = df[df["year"] == df["year"].max()].copy()
    med = latest.groupby("division")["recruit_per_athlete"].transform("median")
    latest["vs_division_median"] = latest["recruit_per_athlete"] / med
    cols = [
        "institution", "state", "division", "year", "partic_total",
        "recruit_total", "recruit_per_athlete", "aid_total",
        "aid_per_athlete", "vs_division_median",
    ]
    latest[[c for c in cols if c in latest.columns]].to_csv(CLEAN_DIR / "school_lookup.csv", index=False)
    log(f"wrote {CLEAN_DIR/'school_lookup.csv'}  (feeds the site's lookup tool)")


def stage_charts(df: pd.DataFrame) -> None:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    CHART_DIR.mkdir(parents=True, exist_ok=True)
    latest_year = df["year"].max()
    latest = df[(df["year"] == latest_year) & (df["recruit_total"].fillna(0) > 0)]

    order = ["NCAA D1 (FBS)", "NCAA D1 (FCS)", "NCAA D1 (No Football)",
             "NCAA D2", "NCAA D3", "NAIA", "2-Year (JUCO)"]

    # Draft 1 — median recruiting spend per athlete by division
    med = latest.groupby("division")["recruit_per_athlete"].median().reindex(order).dropna()
    plt.figure(figsize=(9, 5))
    med.plot(kind="barh")
    plt.title(f"Median recruiting spend per athlete by division ({latest_year})")
    plt.xlabel("Dollars per athlete")
    plt.tight_layout()
    plt.savefig(CHART_DIR / "draft_recruit_per_athlete.png", dpi=200)
    plt.close()

    # Draft 2 — share of total recruiting dollars by division
    share = latest.groupby("division")["recruit_total"].sum().reindex(order).dropna()
    plt.figure(figsize=(9, 5))
    (share / share.sum() * 100).plot(kind="barh")
    plt.title(f"Share of all recruiting dollars by division ({latest_year})")
    plt.xlabel("% of total recruiting spend")
    plt.tight_layout()
    plt.savefig(CHART_DIR / "draft_recruit_share.png", dpi=200)
    plt.close()

    # Draft 3 — trend, if multiple years present
    if df["year"].nunique() > 1:
        nz = df[df["recruit_total"].fillna(0) > 0]
        trend = nz.groupby(["year", "division"])["recruit_per_athlete"].median().unstack()
        trend = trend[[c for c in order if c in trend.columns]]
        plt.figure(figsize=(9, 5))
        trend.plot(marker="o", ax=plt.gca())
        plt.title("Median recruiting spend per athlete — trend")
        plt.ylabel("Dollars per athlete")
        plt.tight_layout()
        plt.savefig(CHART_DIR / "draft_recruit_trend.png", dpi=200)
        plt.close()

    log(f"draft charts written to {CHART_DIR}/ — design reference only, not final art")


# ----------------------------------------------------------------------
def main() -> None:
    ap = argparse.ArgumentParser(description="EADA pipeline — The Money Map")
    ap.add_argument("stage", choices=["inspect", "clean", "all"])
    args = ap.parse_args()

    INTERIM_DIR.mkdir(parents=True, exist_ok=True)

    if args.stage == "inspect":
        stage_inspect()
    elif args.stage == "clean":
        stage_clean()
    else:
        df = stage_clean()
        stage_summarize(df)
        stage_charts(df)
        log("done. Verify division_summary.csv medians against 3 schools by hand before anything publishes.")


if __name__ == "__main__":
    main()
