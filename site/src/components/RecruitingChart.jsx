import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Cell,
} from 'recharts'

const DIVISION_ORDER = [
  'NCAA D1 (FBS)',
  'NCAA D1 (FCS)',
  'NCAA D1 (No Football)',
  'NCAA D2',
  '2-Year (JUCO)',
  'Other',
]

const DIVISION_LABELS = {
  'NCAA D1 (FBS)': 'FBS',
  'NCAA D1 (FCS)': 'FCS',
  'NCAA D1 (No Football)': 'D1 No Football',
  'NCAA D2': 'Division II',
  '2-Year (JUCO)': '2-Year (JUCO)',
  'Other': 'Other',
}

const fmt = (v) => `$${Math.round(v).toLocaleString()}`

export default function RecruitingChart({ showShare = false }) {
  const [data, setData] = useState([])

  useEffect(() => {
    Papa.parse('/data/division_summary.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: ({ data: rows }) => {
        const latest = Math.max(...rows.map((r) => r.year))
        const latestRows = rows.filter((r) => r.year === latest)
        const ordered = DIVISION_ORDER.map((div) => {
          const row = latestRows.find((r) => r.division === div)
          if (!row) return null
          return {
            division: DIVISION_LABELS[div] || div,
            perAthlete: row.recruit_per_athlete_median,
            share: Math.round(row.recruit_share_of_year * 100 * 10) / 10,
          }
        }).filter(Boolean)
        setData(ordered)
      },
    })
  }, [])

  if (!data.length) return <div className="h-64 flex items-center justify-center text-gray-400 text-sm">Loading chart…</div>

  const chartData = showShare
    ? data.map((d) => ({ ...d, value: d.share, label: `${d.share}%` }))
    : data.map((d) => ({ ...d, value: d.perAthlete, label: fmt(d.perAthlete) }))

  const title = showShare
    ? 'Share of all recruiting dollars by division (2024)'
    : 'Median recruiting spend per athlete by division (2024)'

  const ariaLabel = showShare
    ? 'Bar chart: Division I programs account for 88.7% of all recruiting dollars. FBS alone: 68.2%. JUCO: 1.2%.'
    : 'Bar chart: FBS median $151/athlete, FCS $690/athlete, D1 No Football $786/athlete, Division II $118/athlete, 2-Year JUCO $60/athlete'

  return (
    <figure>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</p>
      <div role="img" aria-label={ariaLabel}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 80, left: 108, bottom: 4 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={showShare ? (v) => `${v}%` : fmt}
            />
            <YAxis
              type="category"
              dataKey="division"
              tick={{ fontSize: 11, fill: '#374151' }}
              axisLine={false}
              tickLine={false}
              width={104}
            />
            <Tooltip
              formatter={(v) => [showShare ? `${v}%` : fmt(v), showShare ? 'Share' : 'Per athlete']}
              contentStyle={{ fontSize: 11, border: '1px solid #e5e7eb', borderRadius: 6 }}
            />
            <Bar dataKey="value" radius={[0, 3, 3, 0]} fill="#374151">
              {chartData.map((entry) => (
                <Cell
                  key={entry.division}
                  fill={entry.division === 'FBS' || entry.division.includes('FCS') || entry.division.includes('No Football') ? '#E8472B' : '#d1d5db'}
                />
              ))}
              <LabelList
                dataKey="label"
                position="right"
                style={{ fontSize: 10, fill: '#374151', fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="source-caption">
        <strong>Note:</strong> "NCAA D3" and "NAIA" divisions are absent from this dataset due to a
        pipeline classification issue (see Methodology). Those schools are currently grouped in "Other."
        A corrected pipeline run will restore them.
        <br />
        <strong>Source:</strong> U.S. Department of Education, EADA data files (2015, 2019, 2024 surveys),
        processed by an open pipeline (repo link on Methodology page). Schools reporting $0 recruiting
        excluded from medians.
      </figcaption>
    </figure>
  )
}
