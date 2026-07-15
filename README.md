# The Overlooked Athlete Economy — Vol. 1: The Money Map

**Live site: [money-map-rose.vercel.app](https://money-map-rose.vercel.app)**

Division I holds **37% of NCAA athletes and generates 96% of the revenue**. This project maps where the money in college sports actually goes — and where it doesn't — using only federal disclosures, court filings, and official data.

## What's here

A data journalism site plus the open data pipeline behind it:

- **Four findings** — the two-tier economy of college sports, the NIL visibility premium, the 60.4x recruiting-spend gap, and the new salary-cap era under the House settlement
- **School lookup** — recruiting spend and athletic aid per athlete for every Title IV school in the country, from the 2024-25 federal EADA survey

## Headline numbers

- **$14.6B** — Division I athletics revenue in FY2024, more than every U.S. pro league except the NFL
- **60.4x** — the gap in median recruiting spend per athlete between FBS programs ($3,598) and two-year colleges ($60)
- **>95%** — share of the $2.8B House settlement back damages going to football and basketball players at power-conference schools

## Tech stack

| Layer | Tools |
|---|---|
| Site (`site/`) | Vite, React 19, Tailwind CSS, Recharts, PapaParse |
| Pipeline (`eada_pipeline.py`) | Python, pandas — turns raw EADA survey zips into the clean tables in `data/clean/` |
| Hosting | Vercel |

## Run it locally

```bash
cd site
npm install
npm run dev
```

To rerun the data pipeline: download the survey zips from [ope.ed.gov/athletics](https://ope.ed.gov/athletics/#/datafile/list) into `data/raw/` (don't unzip), then:

```bash
pip install pandas openpyxl matplotlib
python eada_pipeline.py inspect   # verify the column mapping
python eada_pipeline.py all       # clean + summarize + draft charts
```

## Methodology

Every number on the site traces to a public source. Sources, cleaning steps, stated limitations, and the full citations table live on the site's [Methodology page](https://money-map-rose.vercel.app/methodology).
