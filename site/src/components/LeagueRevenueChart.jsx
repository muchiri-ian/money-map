import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, LabelList,
} from 'recharts'

const data = [
  { league: 'NFL', revenue: 22.2 },
  { league: 'Division I', revenue: 14.6 },
  { league: 'MLB', revenue: 12.8 },
  { league: 'NBA', revenue: 12.3 },
  { league: 'NHL', revenue: 6.6 },
  { league: 'MLS', revenue: 2.2 },
].sort((a, b) => a.revenue - b.revenue)

const fmt = (v) => `$${v}B`

export default function LeagueRevenueChart() {
  return (
    <figure>
      <div
        role="img"
        aria-label="Horizontal bar chart comparing annual revenues: NFL $22.2B, Division I athletics $14.6B, MLB $12.8B, NBA $12.3B, NHL $6.6B, MLS $2.2B. Division I bar is highlighted in red."
      >
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 8, right: 72, left: 16, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
            <XAxis
              type="number"
              domain={[0, 24]}
              tickFormatter={fmt}
              tick={{ fontSize: 11, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="league"
              tick={{ fontSize: 12, fill: '#374151', fontWeight: 500 }}
              width={80}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(v) => [`$${v}B`, 'Revenue']}
              contentStyle={{ fontSize: 12, border: '1px solid #e5e7eb', borderRadius: 6 }}
            />
            <Bar dataKey="revenue" radius={[0, 3, 3, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.league}
                  fill={entry.league === 'Division I' ? '#E8472B' : '#d1d5db'}
                />
              ))}
              <LabelList
                dataKey="revenue"
                position="right"
                formatter={fmt}
                style={{ fontSize: 11, fill: '#374151', fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <figcaption className="source-caption">
        <strong>Sources:</strong> Knight-Newhouse College Athletics Database (FY2024); Knight Commission
        House brief (2025). League revenues as compiled by the Economic Policy Institute (FY2024).
      </figcaption>
    </figure>
  )
}
