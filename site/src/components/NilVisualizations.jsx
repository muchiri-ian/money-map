import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts'

const collectiveData = [
  { label: 'Collectives (football & basketball)', pct: 80 },
  { label: 'Commercial / brand deals', pct: 20 },
]

export default function NilVisualizations() {
  return (
    <figure>
      <div
        role="img"
        aria-label="NIL visibility premium: transfer athletes earn 1.7x more, athletes with agents earn 5.3x more, and over 80% of NIL money flows through collectives focused on football and basketball"
      >
        {/* Callout numerals */}
        <div className="flex flex-col sm:flex-row gap-8 mb-10 justify-center">
          <div className="text-center">
            <div className="text-7xl font-black text-red-600 leading-none">1.7<span className="text-4xl">x</span></div>
            <div className="mt-2 text-sm font-semibold text-gray-700">Transfer athletes earn more NIL</div>
            <div className="text-xs text-gray-500 mt-1">vs. peers who stayed</div>
          </div>
          <div className="hidden sm:block w-px bg-gray-200 self-stretch" />
          <div className="text-center">
            <div className="text-7xl font-black text-red-600 leading-none">5.3<span className="text-4xl">x</span></div>
            <div className="mt-2 text-sm font-semibold text-gray-700">Athletes with agents earn more NIL</div>
            <div className="text-xs text-gray-500 mt-1">vs. athletes without representation</div>
          </div>
        </div>

        {/* 80/20 collective bar */}
        <div className="max-w-md mx-auto">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Share of all NIL money</p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart
              data={collectiveData}
              layout="vertical"
              margin={{ top: 4, right: 52, left: 8, bottom: 4 }}
            >
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis
                type="category"
                dataKey="label"
                width={200}
                tick={{ fontSize: 11, fill: '#374151' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(v) => [`${v}%`, 'Share']}
                contentStyle={{ fontSize: 11, border: '1px solid #e5e7eb', borderRadius: 6 }}
              />
              <Bar dataKey="pct" radius={[0, 3, 3, 0]}>
                <Cell fill="#E8472B" />
                <Cell fill="#d1d5db" />
                <LabelList
                  dataKey="pct"
                  position="right"
                  formatter={(v) => `${v}%`}
                  style={{ fontSize: 11, fill: '#374151', fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <figcaption className="source-caption">
        <strong>Source:</strong> Opendorse "NIL at 3" annual report, court-filed exhibit, House v. NCAA
        (Doc 539-14); data July 2021 to June 2024. Industry-wide NIL disclosure runs below 50%, so this
        site reports ratios, not market sizes.
      </figcaption>
    </figure>
  )
}
