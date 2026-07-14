# Money Map Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build "The Overlooked Athlete Economy — Vol. 1: The Money Map" as a Vite + React + Tailwind + Recharts editorial-quality data journalism site with 5 routes, computed data slots, and a client-side school lookup tool.

**Architecture:** Spec-driven build from HANDOFF.md PART A — compute data tokens → fill copy → scaffold Vite project in repo root → build pages/components → self-QA → git init. Data lives in `public/data/` as CSVs, parsed client-side via PapaParse. Routing via React Router + BrowserRouter with `vercel.json` rewrites.

**Tech Stack:** Vite 5, React 18, Tailwind CSS v3, Recharts, PapaParse, React Router v6

---

## Pre-computed Slot Values (PART D)

| Token | Value | Formula |
|---|---|---|
| LATEST_YEAR | 2024 | max(year) in division_summary.csv |
| YEARS_USED | 2014, 2018, 2024 | sorted unique years (⚠️ see flag below) |
| FBS_PER_ATHLETE | $151 | recruit_per_athlete_median, FBS, 2024 = 150.78 |
| JUCO_PER_ATHLETE | $60 | recruit_per_athlete_median, JUCO, 2024 = 59.59 |
| GAP_MULT | 2.5 | 150.78 ÷ 59.59 = 2.530 → 2.5 |
| D1_SCHOOL_PCT | 33.7% | 556 ÷ 1649 = 33.717% |
| D1_DOLLAR_PCT | 88.7% | sum(recruit_share_of_year, 3 D1 buckets) = 0.8873 |
| DROPPED_ROWS | 0 | sum of "dropped N rows" from pipeline log across all years |
| ZERO_RECRUIT_COUNT | 388 | pipeline log for 2024: "388 schools report $0 recruiting" |

### ⚠️ STOP FLAGS — Human Review Required Before Deploy

**FLAG 1 — Missing division labels (PART A stop condition):**
PART D lists expected labels: "NCAA D3" and "NAIA" — neither appears in the CSV.
Actual labels in division_summary.csv: 2-Year (JUCO), NCAA D1 (FBS), NCAA D1 (FCS), NCAA D1 (No Football), NCAA D2, Other.

Root cause (pipeline bug in `eada_pipeline.py`):
- NAIA schools → incorrectly bucketed as "NCAA D1 (FBS)" because pattern `r"NCAA.*Division I-?FBS|I-?A\b"` has a second OR-alternative `I-?A\b` that matches "IA" in "NAIA"
- D3 schools → incorrectly bucketed as "NCAA D1 (No Football)" because `r"NCAA.*Division I\b(?!I)"` matches the trailing "I" in "Division III"

Fix: reorder DIVISION_BUCKETS so D3 appears before D1-No-Football, and fix the NAIA/FBS pattern.

Build impact: Finding 3 chart uses only the 5 actual divisions + "Other" (no D3/NAIA bars). If the human fixes the pipeline and reruns, `public/data/division_summary.csv` can be replaced and the chart will auto-update with correct D3/NAIA data.

**FLAG 2 — Year naming discrepancy:**
PART D example shows YEARS_USED = "2015, 2019, 2024" but the CSV stores start-of-academic-year labels (2014, 2018, 2024). The EADA convention calls "2014-15 data" the "2015 survey." Human should confirm which year labels to use in public-facing citations.
Site is built with "2015, 2019, 2024" as the citation label to match EADA convention, with year column values remaining 2014/2018/2024 internally.

---

### Task 1: SLOTS_REPORT.md
- [ ] Write SLOTS_REPORT.md with all computed values, formulas, and flags

### Task 2: Scaffold Vite Project
- [ ] Run `npm create vite@latest . -- --template react` in repo root
- [ ] Install deps: `tailwindcss postcss autoprefixer recharts papaparse react-router-dom`
- [ ] Configure Tailwind
- [ ] Copy CSVs to `public/data/`
- [ ] Add `vercel.json` for SPA routing

### Task 3: Nav, Layout, and Routing
- [ ] `src/App.jsx` — BrowserRouter + 5 routes
- [ ] `src/components/Nav.jsx` — navigation bar

### Task 4: Home Page
- [ ] `src/pages/Home.jsx` — hero, 3 stat cards, funnel SVG, why-section, footer CTA
- [ ] `src/components/FunnelChart.jsx` — static SVG funnel

### Task 5: Finding 1 Chart
- [ ] `src/components/LeagueRevenueChart.jsx` — horizontal bars, D1 highlighted

### Task 6: Finding 2 Chart
- [ ] `src/components/NilVisualizations.jsx` — callouts + 80/20 bar

### Task 7: Finding 3 Chart
- [ ] `src/components/RecruitingChart.jsx` — PapaParse division_summary.csv → horizontal bars

### Task 8: Finding 4 Diagram
- [ ] `src/components/RevenueShareDiagram.jsx` — static layout, pool + 95/5 bar

### Task 9: Findings Page
- [ ] `src/pages/Findings.jsx` — all 4 findings with charts, figcaptions, alt text

### Task 10: Lookup Tool
- [ ] `src/components/SchoolLookup.jsx` — PapaParse school_lookup.csv, debounced search, result cards
- [ ] `src/pages/Lookup.jsx`

### Task 11: Methodology + About Pages
- [ ] `src/pages/Methodology.jsx`
- [ ] `src/pages/About.jsx`

### Task 12: Meta Tags + OG Image
- [ ] Add meta/OG tags to `index.html`
- [ ] Create OG image component or static asset

### Task 13: Self-QA
- [ ] Run build, check for token leaks, check console errors
- [ ] Write `QA_REPORT.md`

### Task 14: Git Init
- [ ] `git init`, sensible commits, print push/deploy commands
