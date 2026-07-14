# THE MONEY MAP — CLAUDE CODE HANDOFF PACKAGE (FINAL)
The Overlooked Athlete Economy, Vol. 1 | Compiled July 13, 2026
This single document supersedes money-map-site-copy-and-spec.md.

HOW TO USE THIS DOCUMENT
1. Prepare the repo folder as described in PART B.
2. Open Claude Code in that folder and paste PART A (the prompt) verbatim.
3. Claude Code will compute the data slots, build the site, and produce
   SLOTS_REPORT.md. You verify per PART F before deploying. Total human
   time: the verification checklist, roughly one focused hour.

=====================================================================
PART A — THE PROMPT (paste this into Claude Code, verbatim)
=====================================================================

You are building a small, editorial-quality data journalism site called
"The Overlooked Athlete Economy — Vol. 1: The Money Map." Everything you
need is in this repo:

- HANDOFF.md (this file) — contains the final copy (PART C), the slot
  fill-map (PART D), the build spec (PART E), and the QA checklist (PART F).
- data/clean/division_summary.csv and data/clean/school_lookup.csv —
  outputs of eada_pipeline.py, already verified by the owner.
- eada_pipeline.py — reference for how the data was produced.

Work in this exact order:

STEP 1 — COMPUTE SLOTS. Read data/clean/division_summary.csv. Compute
every {{TOKEN}} value using the formulas in PART D. Write SLOTS_REPORT.md
listing each token, its computed value, and the formula used. Do not
round differently than PART D specifies. If a division label in the CSV
does not match the labels in PART D exactly, stop and report the actual
labels before proceeding.

STEP 2 — FILL COPY. Produce the final page copy by replacing every
{{TOKEN}} in PART C with the computed values. No token may remain in
shipped copy. Do not alter any non-token wording without flagging it.

STEP 3 — SCAFFOLD. Vite + React + Tailwind + Recharts + PapaParse.
Five routes: / , /findings , /lookup , /methodology , /about.
Copy the two CSVs into public/data/.

STEP 4 — BUILD per PART E: components, charts, lookup tool, meta tags.

STEP 5 — SELF-QA. Run every item in PART F that does not require the
human. Produce QA_REPORT.md with pass/fail per item.

STEP 6 — Initialize git with sensible commits. Print the exact commands
for the human to push to GitHub and deploy on Vercel. Do not deploy
yourself.

Rules: never invent a number; every figure comes from a token, the copy,
or the CSVs. Accessibility is a feature: every chart gets alt text and a
visible source caption. Keep the design editorial (PART E), not
dashboard-like.

=====================================================================
PART B — REPO PREP (human, ~3 minutes)
=====================================================================
money-map/
├── HANDOFF.md                  (this file, renamed)
├── eada_pipeline.py
├── data/
│   ├── raw/        (the EADA zips — kept for reproducibility)
│   └── clean/      (institutions_clean.csv, division_summary.csv,
│                    school_lookup.csv — from your verified run)
└── charts/         (pipeline draft PNGs, reference only)

Also have handy: the pipeline's printed log from your run (it contains
the filter counts used in {{DROPPED_ROWS}} and {{ZERO_RECRUIT_COUNT}}).
If you did not save the log, rerun: python eada_pipeline.py all

=====================================================================
PART C — FINAL SITE COPY (tokens in {{CAPS}})
=====================================================================

---------------------------------------------------------------------
PAGE 1 — HOME
---------------------------------------------------------------------

[Hero]
# The Overlooked Athlete Economy
## Vol. 1: The Money Map

Division I athletics alone generated $14.6 billion in fiscal 2024. This
project maps where the money in college sports actually goes, and where
it doesn't, using only federal disclosures, court filings, and official
data.

[Three stat cards]
STAT 1:  37% / 96%
Division I holds 37% of NCAA athletes and generates 96% of the revenue.

STAT 2:  1.7x
Athletes who transfer earn 1.7x more in NIL than peers who stay put.

STAT 3:  95%
More than 95% of the $2.8B House settlement damages go to football and
basketball players at power-conference schools.

[Funnel visualization]
Stage 1: ~8,000,000 — high school athletes in the U.S.
Stage 2: ~560,000 — NCAA athletes (about 7%)
Stage 3: the narrow slice above where NIL and revenue-share money
concentrates (visual emphasis, no invented number)
Caption: Nearly eight million students play high school sports; about
560,000 compete in the NCAA. In men's basketball, just 3.6% of high
school players make any NCAA roster. Each stage filters on visibility
as much as talent.
Source line: NCAA Probability of Competing Beyond High School (2024-25
NFHS participation survey; NCAA 2024-25 Sports Sponsorship and
Participation Rates Report).

[Why this project exists]
The money in college sports concentrates on athletes who are already
visible. Recruiting budgets, NIL collectives, and the new revenue-share
pool all point at the same small group, while the pipelines that produce
comparable talent, junior colleges, mid-majors, and late developers,
operate largely outside the spotlight. The numbers below are not a
critique. They are a map.

I come to this question with a stake in it. I run a recruiting platform
for overlooked athletes, and I wanted to know what the data says about
the market I work in. Everything here is sourced from federal
disclosures, court-filed documents, and official databases, and every
number on this site traces to a citation you can check.

[Footer CTA]
Read the findings → | How this was built →

---------------------------------------------------------------------
PAGE 2 — FINDINGS
---------------------------------------------------------------------
Intro line: Four findings. Every number sourced, every chart traceable.

FINDING 1 — A Two-Tier Economy
[Chart 1: D1 vs. pro league revenues, horizontal bars]

Division I athletics generated $14.6 billion in fiscal 2024. That is
more than Major League Baseball, more than the NBA, more than the NHL
and MLS combined. Among American sports leagues, only the NFL is bigger.
The engine is media rights (27% of revenue), donors (22%), tickets
(15%), and institutional support (14%), and it has grown 115% in real
terms since 2015.

But the average hides the structure. The median power-conference
athletic department brings in roughly $145 million a year, about $100
million more than the median program in the rest of FBS. Same division,
same rulebook, different economy.

So-what line: College sports is not one market. It is a small luxury
market attached to a very large everything-else.
Source caption: Knight-Newhouse College Athletics Database (FY2024);
Knight Commission House brief (2025). League revenues as compiled by
the Economic Policy Institute (FY2024).

FINDING 2 — The Visibility Premium
[Chart 2: oversized 1.7x and 5.3x callouts + 80/20 collective vs.
commercial bar]

The largest public dataset of NIL transactions, filed as a court exhibit
in House v. NCAA, shows that the athletes who get paid are the athletes
the market can see. Athletes who transferred earn 1.7x more NIL per year
than peers who stayed. Athletes with agents earn 5.3x more than athletes
without representation. And more than 80% of all NIL money flows through
collectives, which concentrate overwhelmingly on football and men's
basketball.

None of those numbers measures talent. They measure attention,
representation, and movement. In this market, being seen is worth more
than almost any stat line.

So-what line: NIL did not price athletic ability. It priced visibility.
Source caption: Opendorse "NIL at 3" annual report, court-filed exhibit,
House v. NCAA (Doc 539-14); data July 2021 to June 2024. Industry-wide
NIL disclosure runs below 50%, so this site reports ratios, not market
sizes.

FINDING 3 — Recruiting Dollars Chase Visibility
[Chart 3: median recruiting spend per athlete by division, horizontal
bars from division_summary.csv, latest year, FBS at top, 2-Year at
bottom. Optional Chart 3b: share of all recruiting dollars by division.]

This is the only section on this site built from my own data pipeline,
and the inputs are federal. Every school that takes Title IV money and
runs an athletics program must disclose its recruiting spending to the
Department of Education every year.

In the {{LATEST_YEAR}} survey, the median FBS program spent
{{FBS_PER_ATHLETE}} per athlete finding talent. The median two-year
college spent {{JUCO_PER_ATHLETE}}. That is a {{GAP_MULT}}x gap in
discovery budget per athlete. Division I programs, {{D1_SCHOOL_PCT}} of
schools reporting recruiting spend, account for {{D1_DOLLAR_PCT}} of
every recruiting dollar in the data.

Recruiting spend is the purest measure of where institutions look for
talent, and the answer is: mostly where everyone is already looking.

So-what line: The discovery budget concentrates where talent is already
discovered.
Source caption: U.S. Department of Education, EADA data files
({{YEARS_USED}} surveys), processed by an open pipeline (repo link).
Schools reporting $0 recruiting are excluded from medians; full filter
log on the Methodology page.

FINDING 4 — The New Salary Cap Era
[Chart 4: diagram — the revenue-share pool, the 22% formula, and a
95/5 damages split bar]

On July 1, 2025, college sports got a salary cap. Under the House
settlement, each opted-in Division I school can share revenue directly
with athletes: the cap started at $20.5 million for 2025-26, sits at
$21.3 million for 2026-27, and is projected to reach roughly $33 million
by 2035. The figure is defined as 22% of average power-conference
athletic revenue. 327 of 364 Division I schools have opted in.
Scholarship limits are gone, replaced by roster limits, and every
third-party NIL deal over $600 clears a new clearinghouse.

The settlement also settled the past: $2.8 billion in back damages, of
which more than 95% goes to football and men's and women's basketball
players at power-conference schools. The new system pays where the old
system looked.

So-what line: Rosters are now capped portfolios. Every athletic
department just became a fund manager, and most are allocating the way
they always recruited.
Source caption: House v. NCAA settlement (approved June 6, 2025); Knight
Commission brief (2025); cap figures per settlement mechanics and
current-year tracking. Opt-in count as of July 2026.

---------------------------------------------------------------------
PAGE 3 — INTERACTIVE: SCHOOL MONEY LOOKUP
---------------------------------------------------------------------
Header: Look up any school
Sub: Recruiting spend, athletic aid, and dollars per athlete for every
Title IV school with an athletics program, from the {{LATEST_YEAR}}
federal EADA survey.

Search placeholder: Try "UCLA" or "College of Alameda"

Result card fields: school, state, division; athletes (unduplicated
participation); recruiting spend, total and per athlete; athletic aid,
total and per athlete; "vs. division median" indicator.

Empty state: No match. Check spelling, or the school may not file EADA
(service academies and some exempt institutions do not appear).

Data note: Source: U.S. Dept. of Education EADA, {{LATEST_YEAR}} survey.
Figures are institution-reported. Schools reporting zero athletes are
excluded. Full cleaning steps on the Methodology page.

---------------------------------------------------------------------
PAGE 4 — METHODOLOGY
---------------------------------------------------------------------
Intro: Every number on this site traces to a public source. This page is
the map.

A — Sources
- U.S. Dept. of Education, EADA data files (2003-2024): recruiting
  expenses, athletic aid, participation, revenues and expenses for every
  Title IV school with athletics. The only dataset here I process myself.
- Knight-Newhouse College Athletics Database: audited MFRS financial
  reports for 230+ public D1 schools; the authoritative D1 finance source.
- Opendorse "NIL at 3" report: the largest public NIL transaction dataset
  (150,000+ athletes, $250M+ disclosed), cited from the court-filed
  exhibit in House v. NCAA rather than marketing copy.
- House v. NCAA settlement documents and legal summaries.
- NCAA research: probability-of-competing data, demographics database,
  transfer dashboards.
- National Student Clearinghouse: education-wide two-year to four-year
  transfer outcomes.

B — What I did to the EADA data
Downloaded survey zips for {{YEARS_USED}}. Columns were auto-mapped with
a printed, human-verified mapping. Currency fields coerced to numbers.
Institutions reporting zero athletes were dropped ({{DROPPED_ROWS}}
rows). Schools reporting $0 recruiting were kept in the lookup but
excluded from medians ({{ZERO_RECRUIT_COUNT}} schools in
{{LATEST_YEAR}}). Divisions classified from EADA classification fields.
Per-athlete metrics computed as spend divided by unduplicated
participants. Code: [REPO_URL]. Anyone can rerun it.

C — Limitations, stated plainly
1. EADA is self-reported; year-over-year jumps can reflect reporting
   changes rather than real spending changes.
2. Industry-wide NIL disclosure is estimated below 50%; that is why this
   site presents NIL ratios, never market sizes.
3. Division buckets follow EADA classifications; a small number of
   schools sit in "Other" and appear in the lookup but not the division
   charts.
4. This volume is descriptive. It measures where money goes, not why,
   and makes no causal claims. Vol. 2 will model pricing directly.

D — Citations
Render the citations table (stat, value, vintage, source, link) from
money-map-citations.md.

---------------------------------------------------------------------
PAGE 5 — ABOUT
---------------------------------------------------------------------
I'm Ian Muchiri. I study the intersection of finance, AI, and sports:
UCLA Economics, M&A and venture work, and founder of Motion, a
recruiting platform for overlooked athletes. This project is my attempt
to put real numbers under a market I work in every day.

Contact: LinkedIn → linkedin.com/in/ianmuchiri
(Nothing else on this page. No phone. No address.)

=====================================================================
PART D — SLOT FILL-MAP (formulas against division_summary.csv)
=====================================================================
division_summary.csv columns: year, division, schools, athletes,
recruit_total_sum, recruit_median, recruit_per_athlete_median,
aid_per_athlete_median, recruit_share_of_year
Division labels (exact strings from the pipeline): "NCAA D1 (FBS)",
"NCAA D1 (FCS)", "NCAA D1 (No Football)", "NCAA D2", "NCAA D3", "NAIA",
"2-Year (JUCO)", "Other".

| Token | Formula | Format |
|---|---|---|
| {{LATEST_YEAR}} | max(year) | 4-digit year |
| {{YEARS_USED}} | sorted unique years, joined "2015, 2019, 2024" | list |
| {{FBS_PER_ATHLETE}} | recruit_per_athlete_median where division="NCAA D1 (FBS)", year=LATEST | $#,### (nearest dollar) |
| {{JUCO_PER_ATHLETE}} | recruit_per_athlete_median where division="2-Year (JUCO)", year=LATEST | $#,### |
| {{GAP_MULT}} | FBS_PER_ATHLETE ÷ JUCO_PER_ATHLETE | one decimal, e.g. 12.4 |
| {{D1_SCHOOL_PCT}} | sum(schools, 3 D1 buckets) ÷ sum(schools, all buckets), LATEST year | percent, one decimal + "%" |
| {{D1_DOLLAR_PCT}} | sum(recruit_share_of_year, 3 D1 buckets), LATEST year | percent, one decimal + "%" |
| {{DROPPED_ROWS}} | from pipeline log line "dropped N rows with zero/missing athletes" (sum across years) | integer |
| {{ZERO_RECRUIT_COUNT}} | from pipeline log line for LATEST year "N schools report $0 recruiting" | integer |
| [REPO_URL] | filled by human after GitHub push | URL |

Guards: if "2-Year (JUCO)" is missing or has < 20 schools in the latest
year, stop and report; the human decides whether to compare against
"NCAA D3" instead and the copy sentence is adjusted honestly. Percent
figures in copy must sum sensibly (D1_DOLLAR_PCT must be < 100%).

=====================================================================
PART E — BUILD SPEC
=====================================================================
Stack: Vite + React + Tailwind + Recharts + PapaParse. Deploy: Vercel.
Routes: / , /findings , /lookup , /methodology , /about.
Data: copy division_summary.csv and school_lookup.csv into public/data/.

Charts (final, not the pipeline drafts):
1. Home funnel: static SVG, 3 stages, numbers from copy. Alt text
   required.
2. Finding 1: horizontal bar — D1 $14.6B vs NFL $22.2B, MLB $12.8B,
   NBA $12.3B, NHL $6.6B, MLS $2.2B (FY2024). Highlight D1 bar.
3. Finding 2: two oversized numeral callouts (1.7x, 5.3x) + one
   stacked 80/20 bar (collectives vs. commercial).
4. Finding 3: horizontal bar of recruit_per_athlete_median by division,
   latest year, ordered FBS → FCS → D1 No FB → D2 → D3 → NAIA → 2-Year.
   Values labeled on bars. Optional second bar: recruit_share_of_year.
5. Finding 4: diagram (not a chart): pool box with "22% of avg power-
   conference revenue → $21.3M (2026-27)" and a 95/5 damages split bar.

Lookup tool: client-side search over school_lookup.csv (case-insensitive
substring on institution), top 8 suggestions while typing; card renders
Page 3 fields; dollars with thousands separators; per-athlete to nearest
dollar; vs_division_median rendered "1.4x division median" with
above/below styling; handle missing aid fields gracefully.

Design: editorial, not dashboard. Generous whitespace, big numerals, one
accent color, dark-on-light. Real <figcaption> with source + vintage on
every visual. Alt text everywhere. Mobile pass mandatory (cards stack,
charts simplify, lookup thumb-usable). No stock imagery.

Meta: <title> The Overlooked Athlete Economy — The Money Map</title>;
meta description one sentence from the hero; Open Graph title,
description, and a simple OG image (the 37%/96% stat card rendered
1200x630) so the LinkedIn link preview looks intentional.

=====================================================================
PART F — VERIFICATION CHECKLIST (human + Claude Code)
=====================================================================
Claude Code (QA_REPORT.md):
[ ] Zero {{TOKENS}} remaining in built pages
[ ] Chart values match copy values match SLOTS_REPORT.md
[ ] Lookup returns a card for "UCLA"; report whether "College of
    Alameda" is present — if absent, list 3 California community
    colleges that ARE present so the human picks the suggested example
[ ] All figcaptions + alt text present; mobile viewport renders
[ ] Build passes; no console errors

Human (before deploy):
[ ] Read SLOTS_REPORT.md; sanity-check GAP_MULT and D1_DOLLAR_PCT
    against draft_recruit_per_athlete.png and draft_recruit_share.png
[ ] Hand-verify 3 schools in the lookup against the EADA cutting tool
    single-school view (ope.ed.gov/athletics)
[ ] Wednesday checklist from money-map-citations.md complete (Opendorse
    page numbers pinned; opt-in count re-checked; row 2.5 decision made)
[ ] Push repo public; fill [REPO_URL] on Methodology; deploy on Vercel
[ ] Click every source link on the live site once

=====================================================================
PART G — LINKEDIN LAUNCH POST (draft; post when live)
=====================================================================
I built a public data project: The Overlooked Athlete Economy.

Vol. 1 is called The Money Map. It follows the money in college sports
using only federal disclosures, court filings, and official databases.

A few numbers that stuck with me:
Division I holds 37% of NCAA athletes and generates 96% of the revenue.
Athletes who transfer earn 1.7x more in NIL than athletes who stay.
The median FBS program spends {{GAP_MULT}}x more per athlete on
recruiting than the median two-year college.

There is also a lookup tool where you can pull the recruiting and aid
numbers for any school in the country, from UCLA to your local
community college.

Every stat on the site traces to a citation you can check, and the data
pipeline is open on GitHub.

Link: [URL]

Vol. 2 goes deeper. Feedback welcome, especially from people who work
in college sports, recruiting, or sports finance.

(Post note: first comment = link to the Methodology page. No hashtag
spam; three max: #SportsBusiness #NIL #Analytics)
=====================================================================
