import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/findings', label: 'Findings' },
  { to: '/lookup', label: 'School Lookup' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/about', label: 'About' },
]

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50" aria-label="Site navigation">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <NavLink to="/" className="font-bold text-sm tracking-tight text-gray-900 hover:text-red-600 transition-colors">
          The Money Map
        </NavLink>
        <ul className="flex gap-1 items-center" role="list">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
