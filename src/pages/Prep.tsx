import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import {
  PREP_ITEMS,
  loadPrepChecks,
  savePrepChecks,
  type PrepCheckState,
} from '../lib/prepChecklist'

export function Prep() {
  const [checks, setChecks] = useState<PrepCheckState>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setChecks(loadPrepChecks())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    savePrepChecks(checks)
  }, [checks, hydrated])

  const toggle = (id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const checkedCount = PREP_ITEMS.filter((item) => checks[item.id]).length

  return (
    <>
      <RouteMeta
        title="Border prep checklist — Staywindow"
        description="On-device checklist to help visa-free travellers prepare for Schengen/EES borders. Expectations only — not legal advice."
      />
      <h1>Border prep checklist</h1>
      <p className="lede">
        A practical list for visa-free short-stay travellers heading to Schengen / EES borders.
        Tick items on this device — nothing is uploaded.
      </p>
      <p className="disclaimer" role="note">
        Expectations for planning, not guarantees of entry. Not legal advice, and not affiliated
        with the EU or any government. Rules and officer questions vary.
      </p>
      <p className="muted small">
        {checkedCount} of {PREP_ITEMS.length} checked · saved in this browser only
      </p>

      <section className="card prep-checklist" aria-labelledby="prep-list-title">
        <h2 id="prep-list-title">Before you go</h2>
        <ul className="prep-list">
          {PREP_ITEMS.map((item) => {
            const inputId = `prep-${item.id}`
            const helpId = item.help ? `${inputId}-help` : undefined
            return (
              <li key={item.id} className="prep-item">
                <label className="field checkbox-field prep-check">
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={Boolean(checks[item.id])}
                    onChange={() => toggle(item.id)}
                    aria-describedby={helpId}
                  />
                  <span className="prep-label">{item.label}</span>
                </label>
                {item.help && (
                  <p id={helpId} className="prep-help muted small">
                    {item.help}
                  </p>
                )}
                {item.links && item.links.length > 0 && (
                  <ul className="link-list prep-links">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <section className="card prep-next-steps" aria-labelledby="prep-next-title">
        <h2 id="prep-next-title">Optional next steps (affiliates later)</h2>
        <p className="muted">
          Soft placeholders only — no working commercial links and no invented partner brands.
          Coming soon if we add carefully labelled affiliate options.
        </p>
        <ul className="plain-list prep-placeholder-list">
          <li>
            <strong>Insurance</strong> — compare cover that fits your trip (coming soon)
          </li>
          <li>
            <strong>eSIM</strong> — data for maps and boarding passes (coming soon)
          </li>
          <li>
            <strong>Luggage</strong> — cabin size tips live on{' '}
            <NavLink to="/bags">Bags</NavLink>; shop links later
          </li>
        </ul>
      </section>

      <p className="muted small">
        Related: <NavLink to="/stay">Stay calculator</NavLink>
        {' · '}
        <NavLink to="/ees">What is EES?</NavLink>
      </p>
    </>
  )
}
