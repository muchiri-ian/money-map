export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">About</h1>
      <div className="flex items-start gap-5 mb-6">
        <img
          src="/ian-headshot.png"
          alt="Ian Muchiri"
          width="80"
          height="80"
          className="w-20 h-20 rounded-full object-cover border border-gray-200 flex-shrink-0"
        />
        <p className="text-base text-gray-700 leading-relaxed">
          I'm Ian Muchiri, a UCLA Economics '26 graduate working across finance, AI, and sports.
          My background spans M&A research, strategy consulting through a UCLA startup with
          clients including Amazon and Box, a VC externship with HP Tech Ventures, and an AI
          fellowship with Handshake training frontier models.
        </p>
      </div>
      <p className="text-base text-gray-700 leading-relaxed mb-6">
        I'm also the founder of Motion, an AI-powered recruiting platform for athletes outside
        the spotlight. Building it is what taught me where the market actually breaks — and this
        project is what happens when you put real numbers under it.
      </p>
      <p className="text-base text-gray-700 leading-relaxed mb-6">
        Every figure traces to a public source. Everything is open for anyone to verify or
        extend.
      </p>
      <p className="text-sm text-gray-600">
        Contact:{' '}
        <a
          href="https://linkedin.com/in/ianmuchiri"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 underline hover:text-red-800"
        >
          LinkedIn
        </a>
        {' · '}
        <a
          href="https://github.com/muchiri-ian"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 underline hover:text-red-800"
        >
          GitHub
        </a>
      </p>
    </div>
  )
}
