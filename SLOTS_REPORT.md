# SLOTS_REPORT.md — The Money Map
Generated: 2026-07-14 (revised after pipeline fix) | Source: data/clean/division_summary.csv

---

## Pipeline Fix Applied (2026-07-14)

The DIVISION_BUCKETS regex bugs flagged in the first version of this report have been
**fixed in `eada_pipeline.py` and the pipeline rerun**. All values below are computed
from the corrected data.

**What the bugs did (before/after school counts, 2024):**

| Division | Before (buggy) | After (fixed) | Explanation |
|---|---|---|---|
| NCAA D1 (FBS) | 325 | 128 | ~195 NAIA schools had been swallowed into FBS by the `I-?A\b` alternate matching "IA" in "NAIA" |
| NCAA D2 | 682 | 287 | ~396 D3 schools had been swallowed into D2 because "Division III" contains "Division II" as a substring |
| NCAA D3 | missing | 396 | restored |
| NAIA | missing | 195 | restored |
| NCAA D1 (FCS) | 133 | 132 | 1 school reclassified |
| NCAA D1 (No Football) | 98 | 98 | unchanged |
| 2-Year (JUCO) | 335 | 335 | unchanged |
| Other | 76 | 78 | 2 schools reclassified |

*(Correction to the original report: D3 schools had been misrouted into **D2**, not
"D1 (No Football)" — the `Division I\b(?!I)` pattern cannot actually match "Division III"
because the required word boundary fails inside "III"; the D2 pattern `Division II` was
the one matching the first two I's of "III".)*

**Impact on headline numbers:** the FBS per-athlete median was previously diluted by
hundreds of low-spend NAIA schools misfiled as FBS. The corrected numbers:

| Token | Before (buggy data) | After (corrected data) |
|---|---|---|
| FBS_PER_ATHLETE | $151 | **$3,598** |
| JUCO_PER_ATHLETE | $60 | **$60** (unchanged) |
| GAP_MULT | 2.5x | **60.4x** |
| D1_SCHOOL_PCT | 33.7% | **21.7%** |
| D1_DOLLAR_PCT | 88.7% | **87.1%** |

---

## Remaining Flag — Year Labels: CSV vs. EADA Convention

**PART D example:** YEARS_USED = "2015, 2019, 2024" (end-year EADA convention)
**CSV actual years:** 2014, 2018, 2024 (start-year, as extracted by pipeline)

The pipeline's `year_from_name()` extracts the **first** 4-digit year from filenames like
"EADA All Data Combined **2014**-2015". The EADA website calls this the "2015 survey."

**Site is built with "2015, 2019, 2024" for public-facing citations** (matching EADA
convention). Internal CSV year keys remain 2014/2018/2024. If you prefer
"2014, 2018, 2024", find and replace in `src/pages/Methodology.jsx`.

For LATEST_YEAR: site shows **2024** (matches `max(year)` formula; the source file is
"2024-2025"). Confirm this is the survey label you intend to cite.

---

## Computed Token Values (corrected data)

| Token | Raw Value | Formula | Formatted Value |
|---|---|---|---|
| `{{LATEST_YEAR}}` | 2024 | `max(year)` in division_summary.csv | **2024** |
| `{{YEARS_USED}}` | 2014, 2018, 2024 (CSV) | sorted unique years | **2015, 2019, 2024** *(see flag)* |
| `{{FBS_PER_ATHLETE}}` | 3598.3346… | `recruit_per_athlete_median` where division="NCAA D1 (FBS)", year=2024 | **$3,598** |
| `{{JUCO_PER_ATHLETE}}` | 59.5934… | `recruit_per_athlete_median` where division="2-Year (JUCO)", year=2024 | **$60** |
| `{{GAP_MULT}}` | 60.3813… | FBS_PER_ATHLETE ÷ JUCO_PER_ATHLETE = 3598.33 ÷ 59.59 | **60.4** |
| `{{D1_SCHOOL_PCT}}` | 0.21710… | (128+132+98) ÷ 1649 = 358 ÷ 1649 | **21.7%** |
| `{{D1_DOLLAR_PCT}}` | 0.87105… | sum(recruit_share_of_year, D1 FBS+FCS+NoFB, 2024) = 0.6653+0.1304+0.0754 | **87.1%** |
| `{{DROPPED_ROWS}}` | 0 | sum across years: 2014(0) + 2018(0) + 2024(0) | **0** |
| `{{ZERO_RECRUIT_COUNT}}` | 388 | pipeline log: "388 schools report $0 recruiting" for 2024 | **388** |
| `[REPO_URL]` | — | Filled by human after GitHub push | *(human fills)* |

## Finding 3 Chart Data (2024, corrected)

| Division | recruit_per_athlete_median | recruit_share_of_year |
|---|---|---|
| NCAA D1 (FBS) | $3,598 | 66.5% |
| NCAA D1 (FCS) | $705 | 13.0% |
| NCAA D1 (No Football) | $786 | 7.5% |
| NCAA D2 | $132 | 4.2% |
| NCAA D3 | $114 | 5.4% |
| NAIA | $76 | 1.6% |
| 2-Year (JUCO) | $60 | 1.2% |

("Other," 78 schools / 0.4% share, appears in the lookup but not the division charts,
per Methodology limitation #3.)

## Guard Checks

| Guard | Result |
|---|---|
| All 8 PART D division labels present in CSV | ✅ PASS (D3 and NAIA restored by pipeline fix) |
| 2-Year (JUCO) present in latest year | ✅ PASS (335 schools, well above 20-school threshold) |
| D1_DOLLAR_PCT < 100% | ✅ PASS (87.1%) |
| GAP_MULT direction (FBS > JUCO) | ✅ PASS |
| FBS median sanity ($3,598/athlete ≈ $1.5–2M budget ÷ ~550 athletes) | ✅ PLAUSIBLE |

## QA Lookup Pre-check

| School | Present in school_lookup.csv | Division | vs_division_median |
|---|---|---|---|
| "UCLA" → University of California-Los Angeles | ✅ YES | NCAA D1 (FBS) | 1.4x (was a distorted 39.4x on buggy data) |
| "College of Alameda" | ✅ YES | 2-Year (JUCO) | 3.3x |
