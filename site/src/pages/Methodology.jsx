export default function Methodology() {
  const citations = [
    {
      stat: 'D1 revenue, FY2024',
      value: '$14.6B',
      vintage: 'FY2024',
      source: 'Knight-Newhouse College Athletics Database',
      link: 'https://knightnewhousedata.org',
    },
    {
      stat: 'NFL, MLB, NBA, NHL, MLS revenues',
      value: 'Various',
      vintage: 'FY2024',
      source: 'Economic Policy Institute compilation',
      link: 'https://www.epi.org/blog/a-snapshot-of-college-athletes-who-are-they-and-how-much-do-they-earn/',
    },
    {
      stat: 'NIL transfer premium',
      value: '1.7x',
      vintage: 'Jul 2021–Jun 2024',
      source: 'Opendorse "NIL at 3" (House v. NCAA, Doc 539-14)',
      link: null,
      noLink: 'Court filing',
    },
    {
      stat: 'NIL agent premium',
      value: '5.3x',
      vintage: 'Jul 2021–Jun 2024',
      source: 'Opendorse "NIL at 3" (House v. NCAA, Doc 539-14)',
      link: null,
      noLink: 'Court filing',
    },
    {
      stat: 'NIL collective share',
      value: '>80%',
      vintage: 'Jul 2021–Jun 2024',
      source: 'Opendorse "NIL at 3" (House v. NCAA, Doc 539-14)',
      link: null,
      noLink: 'Court filing',
    },
    {
      stat: 'EADA recruiting medians by division',
      value: 'See Finding 3',
      vintage: '2014-15, 2018-19, 2024-25',
      source: 'U.S. Dept. of Education EADA data files',
      link: 'https://ope.ed.gov/athletics/#/datafile/list',
    },
    {
      stat: 'House settlement cap amounts',
      value: '$20.5M / $21.3M',
      vintage: 'Approved Jun 6, 2025',
      source: 'House v. NCAA settlement; Knight Commission brief (2025)',
      link: null,
      noLink: 'Court filing',
    },
    {
      stat: 'House back-damages split',
      value: '>95% to FB/BB',
      vintage: '2025',
      source: 'House v. NCAA settlement documents',
      link: null,
      noLink: 'Court filing',
    },
    {
      stat: 'High school athlete count',
      value: '~8,000,000',
      vintage: '2024-25',
      source: 'NFHS participation survey',
      link: 'https://nfhs.org/resources/sports/high-school-participation-survey-archive',
    },
    {
      stat: 'NCAA athlete count',
      value: '~560,000',
      vintage: '2024-25',
      source: 'NCAA Sports Sponsorship and Participation Rates Report',
      link: 'https://www.ncaa.org/what-we-do/research/sport-sponsorship-and-participation-data/',
    },
    {
      stat: "Men's basketball funnel",
      value: '3.6%',
      vintage: '2024-25',
      source: 'NCAA Probability of Competing Beyond High School',
      link: 'https://www.ncaa.org/student-athletes/probability-of-competing-beyond-high-school/',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Methodology</h1>
      <p className="text-gray-600 mb-10 text-sm leading-relaxed">
        Every number on this site traces to a public source. This page is the map.
      </p>

      {/* A — Sources */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">A. Sources</h2>
        <ul className="space-y-3 text-sm text-gray-700">
          {[
            'U.S. Dept. of Education, EADA data files (2003-04 through 2024-25): recruiting expenses, athletic aid, participation, revenues and expenses for every Title IV school with athletics. The only dataset here I process myself.',
            'Knight-Newhouse College Athletics Database: audited MFRS financial reports for 230+ public D1 schools; the authoritative D1 finance source.',
            'Opendorse "NIL at 3" report: the largest public NIL transaction dataset (150,000+ athletes, $250M+ disclosed), cited from the court-filed exhibit in House v. NCAA rather than marketing copy.',
            'House v. NCAA settlement documents and legal summaries.',
            'NCAA research: probability-of-competing data, demographics database, transfer dashboards.',
            'National Student Clearinghouse: education-wide two-year to four-year transfer outcomes.',
          ].map((s) => (
            <li key={s} className="flex gap-2">
              <span className="text-red-500 mt-0.5 flex-shrink-0">—</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* B — What I did to the EADA data */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">B. What I did to the EADA data</h2>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          Downloaded survey zips for 2014-15, 2018-19, 2024-25. Columns were auto-mapped with a printed,
          human-verified mapping. Currency fields coerced to numbers. Institutions reporting zero
          athletes were dropped (0 rows). Schools reporting $0 recruiting were kept in the lookup
          but excluded from medians (388 schools in 2024). Divisions classified from EADA
          classification fields. Per-athlete metrics computed as spend divided by unduplicated
          participants. Code:{' '}
          <a
            href="https://github.com/muchiri-ian/money-map"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 underline hover:text-red-800"
          >
            github.com/muchiri-ian/money-map
          </a>
          . Anyone can rerun it.
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">
          An earlier pipeline version misclassified NAIA and Division III schools (regex pattern
          bugs, documented and fixed in the repo history). All figures on this site come from
          the corrected run.
        </p>
      </section>

      {/* C — Limitations */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">C. Limitations, stated plainly</h2>
        <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
          {[
            'EADA is self-reported; year-over-year jumps can reflect reporting changes rather than real spending changes.',
            'Industry-wide NIL disclosure is estimated below 50%; that is why this site presents NIL ratios, never market sizes.',
            'Division buckets follow EADA classifications; a small number of schools sit in "Other" and appear in the lookup but not the division charts.',
            'This volume is descriptive. It measures where money goes, not why, and makes no causal claims. Vol. 2 will model pricing directly.',
          ].map((s, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-red-600 font-bold flex-shrink-0">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* D — Citations table */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">D. Citations</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Stat', 'Value', 'Vintage', 'Source', 'Link'].map((h) => (
                  <th key={h} scope="col" className="px-3 py-2.5 font-semibold text-gray-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {citations.map((c, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-3 py-2.5 text-gray-700 font-medium">{c.stat}</td>
                  <td className="px-3 py-2.5 text-gray-900 font-bold whitespace-nowrap">{c.value}</td>
                  <td className="px-3 py-2.5 text-gray-500 whitespace-nowrap">{c.vintage}</td>
                  <td className="px-3 py-2.5 text-gray-600">{c.source}</td>
                  <td className="px-3 py-2.5">
                    {c.link ? (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 underline hover:text-red-800"
                      >
                        Link
                      </a>
                    ) : (
                      <span className="text-gray-400">{c.noLink}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
