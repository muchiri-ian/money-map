import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Findings from './pages/Findings'
import Lookup from './pages/Lookup'
import Methodology from './pages/Methodology'
import About from './pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <Nav />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/findings" element={<Findings />} />
            <Route path="/lookup" element={<Lookup />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-200 py-8 mt-16">
          <div className="max-w-3xl mx-auto px-6 text-center text-sm text-gray-500">
            <p>The Overlooked Athlete Economy — Vol. 1: The Money Map</p>
            <p className="mt-1">Data: U.S. Dept. of Education EADA, 2024-25 survey. Every number traces to a public source.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
