import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const PRIMARY = [
  { to: '/stay', label: 'Stay' },
  { to: '/flights', label: 'Flights' },
  { to: '/bags', label: 'Bags' },
] as const

const MORE_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/ees', label: 'EES' },
  { to: '/photo', label: 'Photo' },
  { to: '/guide/90-180', label: '90/180' },
  { to: '/guide/schengen-countries', label: 'Schengen countries' },
  { to: '/prep', label: 'Prep' },
  { to: '/faq', label: 'FAQ' },
  { to: '/about', label: 'About' },
  { to: '/terms', label: 'Terms' },
] as const

function moreIsActive(pathname: string): boolean {
  if (pathname === '/' || pathname === '/privacy') return true
  if (pathname.startsWith('/guide/')) return true
  return (
    pathname === '/ees' ||
    pathname === '/prep' ||
    pathname === '/faq' ||
    pathname === '/about' ||
    pathname === '/terms' ||
    pathname === '/photo'
  )
}

export function Layout() {
  const location = useLocation()
  const [moreOpen, setMoreOpen] = useState(false)
  const moreWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMoreOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!moreOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    const onPointer = (e: MouseEvent | TouchEvent) => {
      const el = moreWrapRef.current
      if (el && e.target instanceof Node && !el.contains(e.target)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [moreOpen])

  const moreActive = moreIsActive(location.pathname)

  return (
    <div className="shell">
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand" onClick={() => setMoreOpen(false)}>
            Staywindow
          </NavLink>
          <nav className="site-nav" aria-label="Primary">
            {PRIMARY.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="nav-more" ref={moreWrapRef}>
              <button
                type="button"
                className={
                  moreOpen || moreActive ? 'nav-link nav-more-btn active' : 'nav-link nav-more-btn'
                }
                aria-expanded={moreOpen}
                aria-haspopup="true"
                aria-controls="more-panel"
                id="more-trigger"
                onClick={() => setMoreOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setMoreOpen((v) => !v)
                  }
                }}
              >
                More
              </button>
              {moreOpen && (
                <div
                  id="more-panel"
                  className="more-panel"
                  role="menu"
                  aria-labelledby="more-trigger"
                >
                  {MORE_LINKS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={'end' in item ? item.end : undefined}
                      role="menuitem"
                      className={({ isActive }) =>
                        isActive ? 'more-link active' : 'more-link'
                      }
                      onClick={() => setMoreOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p className="footer-guides">
          <NavLink to="/guide/90-180">90/180</NavLink>
          {' · '}
          <NavLink to="/guide/schengen-countries">Schengen countries</NavLink>
          {' · '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            EU short-stay calculator
          </a>
        </p>
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
