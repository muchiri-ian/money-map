export default function FunnelChart() {
  return (
    <figure>
      <svg
        viewBox="0 0 600 272"
        role="img"
        aria-label="Funnel showing 8 million high school athletes narrowing to 560,000 NCAA athletes, then to the small fraction who receive NIL and revenue-share money"
        className="w-full max-w-xl mx-auto block"
      >
        {/* Stage 1 */}
        <rect x="0" y="0" width="600" height="72" rx="4" fill="#1f2937" />
        <text x="300" y="30" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Inter, sans-serif">~8,000,000</text>
        <text x="300" y="56" textAnchor="middle" fill="#d1d5db" fontSize="13" fontFamily="Inter, sans-serif">High school athletes in the U.S.</text>

        {/* Arrow */}
        <polygon points="300,82 290,94 310,94" fill="#9ca3af" />

        {/* Stage 2 */}
        <rect x="90" y="98" width="420" height="72" rx="4" fill="#374151" />
        <text x="300" y="128" textAnchor="middle" fill="white" fontSize="22" fontWeight="bold" fontFamily="Inter, sans-serif">~560,000</text>
        <text x="300" y="154" textAnchor="middle" fill="#d1d5db" fontSize="13" fontFamily="Inter, sans-serif">NCAA athletes (about 7%)</text>

        {/* Arrow */}
        <polygon points="300,180 290,192 310,192" fill="#9ca3af" />

        {/* Stage 3 — sub-label wraps to two lines so nothing overflows the box */}
        <rect x="210" y="196" width="180" height="72" rx="4" fill="#E8472B" />
        <text x="300" y="220" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">NIL &amp; Revenue-Share Pool</text>
        <text x="300" y="238" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Inter, sans-serif">Football &amp; basketball,</text>
        <text x="300" y="253" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10" fontFamily="Inter, sans-serif">power conferences</text>
      </svg>
      <figcaption className="source-caption text-center max-w-xl mx-auto">
        Nearly eight million students play high school sports; about 560,000 compete in the NCAA. In men's
        basketball, just 3.6% of high school players make any NCAA roster. Each stage filters on visibility
        as much as talent.
        <br />
        <strong>Source:</strong> NCAA Probability of Competing Beyond High School (2024-25 NFHS participation
        survey; NCAA 2024-25 Sports Sponsorship and Participation Rates Report).
      </figcaption>
    </figure>
  )
}
