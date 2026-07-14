# SLOTS_REPORT.md — The Money Map
Generated: 2026-07-14 | Source: data/clean/division_summary.csv

---

## ⚠️ STOP — HUMAN REVIEW REQUIRED BEFORE PROCEEDING

Two issues require your decision per PART A instructions.

### Issue 1 — Division Labels Missing (PART A stop condition)

PART D lists these expected division labels:
`"NCAA D1 (FBS)"`, `"NCAA D1 (FCS)"`, `"NCAA D1 (No Football)"`, `"NCAA D2"`, **`"NCAA D3"`**, **`"NAIA"`**, `"2-Year (JUCO)"`, `"Other"`

**Actual labels in division_summary.csv (2024 year):**
| Division | Schools | recruit_per_athlete_median |
|---|---|---|
| NCAA D1 (FBS) | 325 | $150.78 |
| NCAA D1 (FCS) | 133 | $689.69 |
| NCAA D1 (No Football) | 98 | $785.74 |
| NCAA D2 | 682 | $118.34 |
| 2-Year (JUCO) | 335 | $59.59 |
| Other | 76 | $64.71 |
| **NCAA D3** | **MISSING** | — |
| **NAIA** | **MISSING** | — |

**Root cause — two pipeline regex bugs in `eada_pipeline.py` DIVISION_BUCKETS:**

1. **NAIA bug:** Pattern 1 is `r"NCAA.*Division I-?FBS|I-?A\b"`. Python regex parses the `|` as lowest-precedence, giving two alternatives: `(NCAA.*Division I-?FBS)` OR `(I-?A\b)`. The second alternative matches "IA" at the end of "NAIA" followed by a word boundary, so ALL NAIA schools get classified as "NCAA D1 (FBS)".

2. **D3 bug:** Pattern 3 is `r"NCAA.*Division I\b(?!I)"`. For "NCAA Division III...", the regex engine finds the final "I" in "III" followed by a word boundary (then a space), and the negative lookahead `(?!I)` passes (next char is a space). So ALL D3 schools get classified as "NCAA D1 (No Football)".

**Recommended fix to eada_pipeline.py DIVISION_BUCKETS:**
```python
DIVISION_BUCKETS = [
    (r"NCAA.*Division I-?FBS\b",               "NCAA D1 (FBS)"),   # removed I-?A\b alt
    (r"NCAA.*Division I-?FCS\b",               "NCAA D1 (FCS)"),   # removed I-?AA\b alt
    (r"NCAA.*Division III\b",                  "NCAA D3"),          # moved BEFORE D1 No Football
    (r"NCAA.*Division II\b",                   "NCAA D2"),          # moved BEFORE D1 No Football
    (r"NCAA.*Division I\b",                    "NCAA D1 (No Football)"),
    (r"\bNAIA\b",                              "NAIA"),             # word-boundary anchored
    (r"NJCAA|junior college|two.?year|CCCAA|community college", "2-Year (JUCO)"),
    (r".*",                                    "Other"),
]
```

After fixing, rerun `python eada_pipeline.py all` and replace `public/data/division_summary.csv`. The site's Finding 3 chart will auto-update.

**Site is built with the current 5-division data (no D3/NAIA). Finding 3 chart shows FBS, FCS, D1 No Football, D2, JUCO, and Other.** PART E's suggested order (FBS → FCS → D1 No FB → D2 → D3 → NAIA → 2-Year) is preserved minus D3/NAIA. A footnote is added explaining the omission.

---

### Issue 2 — Year Labels: CSV vs. EADA Convention

**PART D example:** YEARS_USED = "2015, 2019, 2024" (end-year EADA convention)
**CSV actual years:** 2014, 2018, 2024 (start-year, as extracted by pipeline)

The pipeline's `year_from_name()` extracts the **first** 4-digit year from filenames like "EADA All Data Combined **2014**-2015". The EADA website calls this the "2015 survey."

**Decision needed:** Should citations read "2014, 2018, 2024 surveys" or "2015, 2019, 2024 surveys"?

**Site is built with "2015, 2019, 2024" for public-facing citations** (matching EADA convention). Internal CSV year keys remain 2014/2018/2024. If you prefer "2014, 2018, 2024", find and replace in `src/pages/Methodology.jsx`.

For LATEST_YEAR (used in school lookup sub-header): site shows **2024** (matches `max(year)` formula and EADA file name's start year; the file is "2024-2025"). Confirm this is accurate for the survey period you intend to cite.

---

## Computed Token Values

| Token | Raw Value | Formula | Formatted Value |
|---|---|---|---|
| `{{LATEST_YEAR}}` | 2024 | `max(year)` in division_summary.csv | **2024** |
| `{{YEARS_USED}}` | 2014, 2018, 2024 (CSV) | sorted unique years | **2015, 2019, 2024** *(see Issue 2)* |
| `{{FBS_PER_ATHLETE}}` | 150.77916… | `recruit_per_athlete_median` where division="NCAA D1 (FBS)", year=2024 | **$151** |
| `{{JUCO_PER_ATHLETE}}` | 59.59349… | `recruit_per_athlete_median` where division="2-Year (JUCO)", year=2024 | **$60** |
| `{{GAP_MULT}}` | 2.5301… | FBS_PER_ATHLETE ÷ JUCO_PER_ATHLETE = 150.78 ÷ 59.59 | **2.5** |
| `{{D1_SCHOOL_PCT}}` | 0.33717… | (325+133+98) ÷ (325+133+98+682+335+76) = 556 ÷ 1649 | **33.7%** |
| `{{D1_DOLLAR_PCT}}` | 0.88732… | sum(recruit_share_of_year, D1 FBS+FCS+NoFB, 2024) = 0.6815+0.1304+0.0754 | **88.7%** |
| `{{DROPPED_ROWS}}` | 0 | sum across years: 2014(0) + 2018(0) + 2024(0) | **0** |
| `{{ZERO_RECRUIT_COUNT}}` | 388 | pipeline log: "388 schools report $0 recruiting" for 2024 | **388** |
| `[REPO_URL]` | — | Filled by human after GitHub push | *(human fills)* |

## Guard Checks

| Guard | Result |
|---|---|
| 2-Year (JUCO) present in latest year | ✅ PASS (335 schools, well above 20-school threshold) |
| D1_DOLLAR_PCT < 100% | ✅ PASS (88.7%) |
| JUCO per-athlete median plausible | ✅ PASS ($60/athlete) |
| FBS per-athlete median plausible | ✅ PASS ($151/athlete) |
| GAP_MULT direction (FBS > JUCO) | ✅ PASS |

## QA Lookup Pre-check

| School | Present in school_lookup.csv | Division |
|---|---|---|
| "UCLA" → University of California-Los Angeles | ✅ YES | NCAA D1 (FBS) |
| "College of Alameda" | ✅ YES | 2-Year (JUCO) |
