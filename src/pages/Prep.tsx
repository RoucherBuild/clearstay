import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'
import {
  PREP_ITEMS,
  loadPrepChecks,
  savePrepChecks,
  type PrepCheckState,
} from '../lib/prepChecklist'


const PREP_FAQS = [
  {
    q: 'What should I do before a Europe trip regarding ETIAS and EES?',
    a: 'Read official EU EES and ETIAS pages, track your Schengen days, and confirm with the official EU short-stay calculator. Staywindow does not sell ETIAS applications.',
  },
  {
    q: 'Does this checklist guarantee entry?',
    a: 'No. It is an unofficial on-device planning list. Border decisions remain with the state.',
  },
  {
    q: 'Where are my checklist ticks stored?',
    a: 'On this device only in localStorage. Nothing is uploaded.',
  },
]

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
        title="Europe trip prep checklist (unofficial)"
        description="Unofficial ETIAS/EES Europe trip prep checklist. Official links only — not an ETIAS mill. Confirm the EU short-stay calculator."
        path="/prep"
        faqs={PREP_FAQS}
      />
      <h1>Europe trip prep checklist (unofficial)</h1>
      <p className="lede">
        What to do before a Europe trip: EES expectations, ETIAS awareness, and Schengen day
        tracking. Tick items on this device — nothing is uploaded. Not an ETIAS application mill.
      </p>
      <section className="qa-block stay-explainer">
        <h2>ETIAS, EES, and what to do before you go</h2>
        <p>
          Travellers searching “ETIAS EES what to do before Europe trip” need calm steps, not a
          shop. Read official EU pages for EES and ETIAS, estimate days on{' '}
          <NavLink to="/stay">Stay</NavLink>, then confirm with the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          . See <NavLink to="/ees">EES vs the 90/180 calculator</NavLink>.
        </p>
      </section>
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

      <FaqDetails faqs={PREP_FAQS} />

      <p className="muted small">
        Related: <NavLink to="/stay">Stay calculator</NavLink>
        {' · '}
        <NavLink to="/ees">EES vs 90/180</NavLink>
      </p>
    </>
  )
}
