import LeagueRevenueChart from '../components/LeagueRevenueChart'
import NilVisualizations from '../components/NilVisualizations'
import RecruitingChart from '../components/RecruitingChart'
import RevenueShareDiagram from '../components/RevenueShareDiagram'

function Finding({ number, title, children }) {
  return (
    <section className="mb-20 scroll-mt-20" id={`finding-${number}`}>
      <p className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-1">
        Finding {number}
      </p>
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-8">{title}</h2>
      {children}
    </section>
  )
}

export default function Findings() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Findings</h1>
      <p className="text-gray-600 mb-12 text-sm">Four findings. Every number sourced, every chart traceable.</p>

      {/* Finding 1 */}
      <Finding number={1} title="A Two-Tier Economy">
        <LeagueRevenueChart />
        <div className="mt-8 space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            Division I athletics generated $14.6 billion in fiscal 2024. That is more than Major
            League Baseball, more than the NBA, more than the NHL and MLS combined. Among American
            sports leagues, only the NFL is bigger. The engine is media rights (27% of revenue),
            donors (22%), tickets (15%), and institutional support (14%), and it has grown 115% in
            real terms since 2015.
          </p>
          <p>
            But the average hides the structure. The median power-conference athletic department
            brings in roughly $145 million a year, about $100 million more than the median program
            in the rest of FBS. Same division, same rulebook, different economy.
          </p>
          <p className="so-what">
            College sports is not one market. It is a small luxury market attached to a very large everything-else.
          </p>
        </div>
      </Finding>

      {/* Finding 2 */}
      <Finding number={2} title="The Visibility Premium">
        <NilVisualizations />
        <div className="mt-8 space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            The largest public dataset of NIL transactions, filed as a court exhibit in House v.
            NCAA, shows that the athletes who get paid are the athletes the market can see. Athletes
            who transferred earn 1.7x more NIL per year than peers who stayed. Athletes with agents
            earn 5.3x more than athletes without representation. And more than 80% of all NIL money
            flows through collectives, which concentrate overwhelmingly on football and men's
            basketball.
          </p>
          <p>
            None of those numbers measures talent. They measure attention, representation, and
            movement. In this market, being seen is worth more than almost any stat line.
          </p>
          <p className="so-what">
            NIL did not price athletic ability. It priced visibility.
          </p>
        </div>
      </Finding>

      {/* Finding 3 */}
      <Finding number={3} title="Recruiting Dollars Chase Visibility">
        <RecruitingChart />
        <div className="mt-6">
          <RecruitingChart showShare />
        </div>
        <div className="mt-8 space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            This is the only section on this site built from my own data pipeline, and the inputs
            are federal. Every school that takes Title IV money and runs an athletics program must
            disclose its recruiting spending to the Department of Education every year.
          </p>
          <p>
            In the 2024-25 survey, the median FBS program spent <strong>$3,598</strong> per athlete
            finding talent. The median two-year college spent <strong>$60</strong>. That is a{' '}
            <strong>60.4x</strong> gap in discovery budget per athlete. Division I programs, 21.7%
            of schools reporting recruiting spend, account for <strong>87.1%</strong> of every
            recruiting dollar in the data.
          </p>
          <p>
            Recruiting spend is the purest measure of where institutions look for talent, and the
            answer is: mostly where everyone is already looking.
          </p>
          <p className="so-what">
            The discovery budget concentrates where talent is already discovered.
          </p>
        </div>
      </Finding>

      {/* Finding 4 */}
      <Finding number={4} title="The New Salary Cap Era">
        <RevenueShareDiagram />
        <div className="mt-8 space-y-4 text-gray-700 text-sm leading-relaxed">
          <p>
            On July 1, 2025, college sports got a salary cap. Under the House settlement, each
            opted-in Division I school can share revenue directly with athletes: the cap started at
            $20.5 million for 2025-26, sits at $21.3 million for 2026-27, and is projected to
            reach roughly $33 million by 2035. The figure is defined as 22% of average
            power-conference athletic revenue. 327 of 364 Division I schools have opted in.
            Scholarship limits are gone, replaced by roster limits, and every third-party NIL deal
            over $600 clears a new clearinghouse.
          </p>
          <p>
            The settlement also settled the past: $2.8 billion in back damages, of which more than
            95% goes to football and men's and women's basketball players at power-conference
            schools. The new system pays where the old system looked.
          </p>
          <p className="so-what">
            Rosters are now capped portfolios. Every athletic department just became a fund manager, and most are allocating the way they always recruited.
          </p>
        </div>
      </Finding>
    </div>
  )
}
