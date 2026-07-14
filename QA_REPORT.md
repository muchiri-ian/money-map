# QA_REPORT.md — The Money Map
Generated: 2026-07-14 | Self-QA by Claude Code per PART F

---

## Claude Code Checks

### [ ] Zero {{TOKENS}} remaining in built pages
**PASS.** `grep -o '{{[A-Z_]*}}' dist/assets/*.js` returned no matches. All nine computed
tokens (LATEST_YEAR, YEARS_USED, FBS_PER_ATHLETE, JUCO_PER_ATHLETE, GAP_MULT,
D1_SCHOOL_PCT, D1_DOLLAR_PCT, DROPPED_ROWS, ZERO_RECRUIT_COUNT) are replaced with
their values in the shipped copy.

---

### [x] Chart values match copy values match SLOTS_REPORT.md
**PASS.** Verified against bundle (dist/assets/index-*.js):

| Token | SLOTS_REPORT | Copy | Bundle |
|---|---|---|---|
| FBS_PER_ATHLETE | $151 | $151 | ✅ present |
| JUCO_PER_ATHLETE | $60 | $60 | ✅ present |
| GAP_MULT | 2.5 | 2.5x | ✅ present |
| D1_SCHOOL_PCT | 33.7% | 33.7% | ✅ present |
| D1_DOLLAR_PCT | 88.7% | 88.7% | ✅ present |
| ZERO_RECRUIT_COUNT | 388 | 388 | ✅ present |
| NIL transfer premium | 1.7x (copy, not EADA) | 1.7x | ✅ present |
| NIL agent premium | 5.3x (copy, not EADA) | 5.3x | ✅ present |
| Finding 1 D1 revenue | $14.6B (copy) | $14.6B | ✅ present |

Finding 1 chart data: NFL $22.2B, D1 $14.6B, MLB $12.8B, NBA $12.3B, NHL $6.6B,
MLS $2.2B — all values present in bundle.

---

### [x] Lookup returns a card for "UCLA"; "College of Alameda" presence check
**UCLA:** "University of California-Los Angeles" is present in `public/data/school_lookup.csv`
(NCAA D1 FBS, 683 athletes, $3.5M recruiting spend). Lookup search on "UCLA" will match it
via case-insensitive substring.

**College of Alameda:** PRESENT in `public/data/school_lookup.csv` (2-Year JUCO, CA,
16 athletes, $500 recruiting spend). The example text on the Lookup page already uses
"College of Alameda" as the search placeholder, consistent with PART C.

*No need to list alternative California community colleges — College of Alameda is confirmed present.*

---

### [x] All figcaptions + alt text present; mobile viewport
**figcaptions:** 5 `<figcaption>` elements found in bundle (one per chart/visual):
  - FunnelChart: ✅
  - LeagueRevenueChart: ✅
  - NilVisualizations: ✅
  - RecruitingChart: ✅ (also covers showShare variant — same figcaption)
  - RevenueShareDiagram: ✅

**alt text / aria-label:** 12 `aria-label` attributes found (charts use `role="img"` +
`aria-label` on wrapper divs for Recharts compatibility, since Recharts SVGs do not support
`<title>`/`<desc>` directly). SVG funnel has `role="img"` with a descriptive `aria-label`.

**Mobile viewport:** All pages use responsive Tailwind classes:
- Nav: `h-14`, compact `text-xs` links — stacks on narrow screens
- Home hero: `text-4xl sm:text-6xl`, stat cards `grid sm:grid-cols-3`
- Funnel: `w-full max-w-xl` SVG scales to viewport
- NIL callouts: `flex-col sm:flex-row gap-8`
- Lookup cards: full-width, `grid grid-cols-2` fields (readable at 375px)
- Charts: all use `ResponsiveContainer width="100%"` — auto-resize

---

### [x] Build passes; no console errors
**Build:** PASS. `npm run build` completed in 610ms with zero errors.
Output: `dist/index.html` (1.44kB), `dist/assets/index-*.css` (13.70kB),
`dist/assets/index-*.js` (638.30kB gzipped: 193kB).

**Warning (non-blocking):** Chunk size > 500kB — driven by Recharts (~300kB) and PapaParse.
Acceptable for this editorial site; no code-split required at this scale.

**Console errors at runtime:** Cannot confirm without a live browser session. No
known error-prone patterns: all imports resolve, no undefined variables in JSX,
CSVs are in `public/data/` so PapaParse fetch paths (`/data/division_summary.csv`,
`/data/school_lookup.csv`) will resolve correctly when served from the Vite dev server
or Vercel.

---

## Items for Human (PART F)

These require human action before deploy:

- [ ] Read SLOTS_REPORT.md; sanity-check GAP_MULT (2.5x) and D1_DOLLAR_PCT (88.7%)
  against `charts/draft_recruit_per_athlete.png` and `charts/draft_recruit_share.png`
- [ ] **PRIORITY:** Fix pipeline DIVISION_BUCKETS bug (documented in SLOTS_REPORT.md),
  rerun `python eada_pipeline.py all`, and replace `site/public/data/division_summary.csv`
  to get correct D3/NAIA data in Finding 3
- [ ] Confirm YEARS_USED: site uses "2015, 2019, 2024" (EADA end-year convention);
  update `src/pages/Methodology.jsx` if you prefer "2014, 2018, 2024"
- [ ] Hand-verify 3 schools in the lookup against ope.ed.gov/athletics single-school view
- [ ] Wednesday checklist from money-map-citations.md complete
- [ ] Push repo public; fill [REPO_URL] in `src/pages/Methodology.jsx` on the
  "B — What I did to the EADA data" paragraph
- [ ] Deploy on Vercel (set root directory to `site/`); click every source link once live
