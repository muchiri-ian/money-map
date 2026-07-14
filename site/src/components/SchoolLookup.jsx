import { useEffect, useRef, useState } from 'react'
import Papa from 'papaparse'

const fmt = (v) =>
  v != null && !isNaN(v) ? `$${Math.round(v).toLocaleString()}` : '—'

const fmtMultiple = (v) => {
  if (v == null || isNaN(v) || v === 0) return null
  return `${v.toFixed(1)}x division median`
}

function ResultCard({ school }) {
  const vsMedian = parseFloat(school.vs_division_median)
  const vsLabel = fmtMultiple(vsMedian)
  const vsColor =
    vsMedian > 1 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold text-gray-900 text-base leading-tight">{school.institution}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{school.state} · {school.division}</p>
        </div>
        {vsLabel && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${vsColor}`}>
            {vsLabel}
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Athletes (unduplicated)</div>
          <div className="font-bold text-gray-900">{parseInt(school.partic_total).toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Recruiting spend (total)</div>
          <div className="font-bold text-gray-900">{fmt(school.recruit_total)}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Recruiting per athlete</div>
          <div className="font-bold text-red-600">{fmt(school.recruit_per_athlete)}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Athletic aid (total)</div>
          <div className="font-bold text-gray-900">{fmt(school.aid_total)}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 col-span-2">
          <div className="text-xs text-gray-500 mb-1">Athletic aid per athlete</div>
          <div className="font-bold text-gray-900">{fmt(school.aid_per_athlete)}</div>
        </div>
      </div>
    </div>
  )
}

export default function SchoolLookup() {
  const [allSchools, setAllSchools] = useState([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const inputRef = useRef(null)

  useEffect(() => {
    Papa.parse('/data/school_lookup.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: ({ data }) => setAllSchools(data.filter((r) => r.institution)),
    })
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const matches = allSchools
      .filter((s) => s.institution.toLowerCase().includes(q))
      .slice(0, 8)
    setResults(matches)
  }, [query, allSchools])

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Look up any school</h1>
      <p className="text-gray-600 mb-8 text-sm leading-relaxed">
        Recruiting spend, athletic aid, and dollars per athlete for every Title IV school with an
        athletics program, from the 2024 federal EADA survey.
      </p>

      <div className="relative">
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Try "UCLA" or "College of Alameda"'
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
          aria-label="Search for a school"
          aria-controls="lookup-results"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div id="lookup-results" role="region" aria-label="Search results" className="mt-6 space-y-4">
        {query && results.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">
            No match. Check spelling, or the school may not file EADA (service academies and some
            exempt institutions do not appear).
          </p>
        )}
        {results.map((school) => (
          <ResultCard key={`${school.institution}-${school.state}`} school={school} />
        ))}
      </div>

      <p className="source-caption mt-8">
        Source: U.S. Dept. of Education EADA, 2024 survey. Figures are institution-reported.
        Schools reporting zero athletes are excluded. Full cleaning steps on the{' '}
        <a href="/methodology" className="underline hover:text-gray-700">Methodology page</a>.
      </p>
    </div>
  )
}
