export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">About</h1>
      <p className="text-base text-gray-700 leading-relaxed mb-6">
        I'm Ian Muchiri. I study the intersection of finance, AI, and sports: UCLA Economics, M&A
        and venture work, and founder of Motion, a recruiting platform for overlooked athletes. This
        project is my attempt to put real numbers under a market I work in every day.
      </p>
      <p className="text-sm text-gray-600">
        Contact:{' '}
        <a
          href="https://linkedin.com/in/ianmuchiri"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 underline hover:text-red-800"
        >
          LinkedIn → linkedin.com/in/ianmuchiri
        </a>
      </p>
    </div>
  )
}
