import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/stay', label: 'Stay' },
  { to: '/ees', label: 'EES' },
  { to: '/flights', label: 'Flights' },
  { to: '/bags', label: 'Bags' },
  { to: '/photo', label: 'Photo' },
  { to: '/guide/90-180', label: '90/180' },
  { to: '/faq', label: 'FAQ' },
]

const EU_CALC =
  'https://ec.europa.eu/immigration/visas-border-crossings/border-crossing/schengen-calculator_en'

export function Layout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="shell">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
            Staywindow
          </NavLink>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
          <nav id="site-nav" className={open ? 'site-nav open' : 'site-nav'}>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p className="footer-disclaimer">
          Not official advice. Staywindow is an independent planning tool — not a government
          site, visa shop, or claim company.
        </p>
        <p>
          <a href={EU_CALC} target="_blank" rel="noopener noreferrer">
            EU short-stay calculator
          </a>
          {' · '}
          <NavLink to="/privacy">Privacy</NavLink>
          {' · '}
          <NavLink to="/about">About</NavLink>
          {' · '}
          <NavLink to="/faq">FAQ</NavLink>
        </p>
        <p className="footer-note">Your trip data stays on this device.</p>
      </footer>
    </div>
  )
}
