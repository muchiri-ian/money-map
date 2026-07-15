import { Link } from 'react-router-dom'
import FunnelChart from '../components/FunnelChart'

const statCards = [
  {
    stat: '37% / 96%',
    desc: 'Division I holds 37% of NCAA athletes and generates 96% of the revenue.',
  },
  {
    stat: '1.7x',
    desc: 'Athletes who transfer earn 1.7x more in NIL than peers who stay put.',
  },
  {
    stat: '95%',
    desc: 'More than 95% of the $2.8B House settlement damages go to football and basketball players at power-conference schools.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">Vol. 1, July 2026</p>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-3">
            The Overlooked<br />Athlete Economy
          </h1>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-300 mb-8">
            The Money Map
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-xl leading-relaxed">
            Division I athletics alone generated $14.6 billion in fiscal 2024. This project maps
            where the money in college sports actually goes, and where it doesn't, using only
            federal disclosures, court filings, and official data.
          </p>
        </div>
      </section>

      {/* Stat cards */}
      <section className="max-w-5xl mx-auto px-6 py-12" aria-label="Key statistics">
        <div className="grid sm:grid-cols-3 gap-6">
          {statCards.map(({ stat, desc }) => (
            <div
              key={stat}
              className="bg-gray-50 border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
            >
              <div className="text-4xl font-black text-red-600 mb-3">{stat}</div>
              <p className="text-sm text-gray-700 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funnel */}
      <section className="max-w-3xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">The Funnel</h2>
        <FunnelChart />
      </section>

      {/* Why this project */}
      <section className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-2xl mx-auto prose prose-sm">
          <h2 className="text-2xl font-bold mb-4">Why this project exists</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The money in college sports concentrates on athletes who are already visible. Recruiting
            budgets, NIL collectives, and the new revenue-share pool all point at the same small
            group, while the pipelines that produce comparable talent, junior colleges, mid-majors,
            and late developers, operate largely outside the spotlight. The numbers below are not a
            critique. They are a map.
          </p>
          <p className="text-gray-700 leading-relaxed">
            I come to this question with a stake in it. I run a recruiting platform for overlooked
            athletes, and I wanted to know what the data says about the market I work in. Everything
            here is sourced from federal disclosures, court-filed documents, and official databases,
            and every number on this site traces to a citation you can check.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-50 border-t border-gray-200 py-10 px-6 text-center">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/findings"
            className="inline-block bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Read the findings →
          </Link>
          <Link
            to="/methodology"
            className="inline-block bg-white border border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            How this was built →
          </Link>
        </div>
      </section>
    </div>
  )
}
