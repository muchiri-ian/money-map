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
          fellowship with Handshake training frontier models. I'm the founder of Motion, a
          recruiting platform for overlooked athletes.
        </p>
      </div>
      <p className="text-base text-gray-700 leading-relaxed mb-6">
        This project is where those threads meet: real numbers under a market I work in every
        day. Every figure traces to a public source. Everything is open for anyone to verify or
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
