export default function RevenueShareDiagram() {
  return (
    <figure>
      <div
        role="img"
        aria-label="Diagram: The revenue-share pool is defined as 22% of average power-conference athletic revenue, set at $20.5M for 2025-26, $21.3M for 2026-27, projected to reach ~$33M by 2035. A split bar shows 95% of back damages going to football and basketball players at power conferences, and 5% to other athletes."
        className="space-y-8 max-w-lg mx-auto"
      >
        {/* Pool box */}
        <div className="border-2 border-gray-900 rounded-xl p-6 text-center bg-gray-50">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Revenue-Share Pool</div>
          <div className="text-3xl font-black text-gray-900 mb-1">22%</div>
          <div className="text-sm text-gray-600 mb-4">of average power-conference athletic revenue</div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-center">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
              <div className="text-xl font-bold text-gray-900">$20.5M</div>
              <div className="text-xs text-gray-500">2025-26 cap</div>
            </div>
            <div className="bg-white border border-red-200 rounded-lg px-4 py-3">
              <div className="text-xl font-bold text-red-600">$21.3M</div>
              <div className="text-xs text-gray-500">2026-27 cap</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3">
              <div className="text-xl font-bold text-gray-900">~$33M</div>
              <div className="text-xs text-gray-500">projected 2035</div>
            </div>
          </div>
        </div>

        {/* 95/5 damages split */}
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 text-center">
            $2.8B back-damages allocation
          </div>
          <div className="flex h-10 rounded-lg overflow-hidden shadow-sm" aria-hidden="true">
            <div
              className="flex items-center justify-center bg-red-600 text-white text-sm font-bold"
              style={{ width: '95%' }}
            >
              95% — Football &amp; Basketball (Power Conferences)
            </div>
            <div
              className="flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-semibold"
              style={{ width: '5%' }}
            >
              5%
            </div>
          </div>
          <div className="flex text-xs text-gray-500 mt-1.5">
            <span className="flex-1">Football, Men's &amp; Women's Basketball at power-conference schools</span>
            <span>Other athletes</span>
          </div>
        </div>
      </div>
      <figcaption className="source-caption text-center">
        <strong>Sources:</strong> House v. NCAA settlement (approved June 6, 2025); Knight Commission
        brief (2025); cap figures per settlement mechanics and current-year tracking. Opt-in count
        (327 of 364 Division I schools) as of July 2026.
      </figcaption>
    </figure>
  )
}
