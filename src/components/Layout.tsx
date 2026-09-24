import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/stay', label: 'Stay' },
  { to: '/outside', label: 'Outside' },
  { to: '/ees', label: 'EES' },
  { to: '/flights', label: 'Flights' },
  { to: '/bags', label: 'Bags' },
  { to: '/photo', label: 'Photo' },
  { to: '/guide/90-180', label: '90/180' },
  { to: '/prep', label: 'Prep' },
  { to: '/faq', label: 'FAQ' },
]

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
          Not official advice
          {' · '}
          <NavLink to="/terms">Terms</NavLink>
          {' · '}
          <NavLink to="/privacy">Privacy</NavLink>
        </p>
        <p className="footer-contact">
          Contact: <a href="mailto:hello@thestaywindow.com">hello@thestaywindow.com</a>
        </p>
        <p className="footer-note">Your trip data stays on this device.</p>
      </footer>
    </div>
  )
}
