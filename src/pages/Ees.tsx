import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_EES_OVERVIEW, EU_ETIAS, EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'Does EES change the 90/180 rule?',
    a: 'No. EES records crossings electronically. It does not invent a new day-count formula. You still plan against the usual short-stay rules and confirm with the official EU short-stay calculator.',
  },
  {
    q: 'Is EES the same as ETIAS?',
    a: 'No. EES is a border registration system at entry/exit. ETIAS is a separate travel authorisation topic when in force. Staywindow does not sell ETIAS.',
  },
  {
    q: 'Should I buy an “EES package” online?',
    a: 'No. Use official EU information pages. Staywindow links official overviews only.',
  },
]

export function Ees() {
  return (
    <>
      <RouteMeta
        title="EES vs the 90/180 calculator"
        description="Does EES change the 90/180 rule? EES records Schengen crossings; it does not invent a new day count. Unofficial explainer with official EU links only."
        path="/ees"
        faqs={FAQS}
      />
      <h1>EES vs the 90/180 calculator</h1>
      <p className="lede">
        Short answer: the Entry/Exit System records crossings; it does not invent a new 90/180 day
        count. Use official EU pages for EES/ETIAS, and confirm day totals with the{' '}
        <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
          official EU short-stay calculator
        </a>
        .
      </p>

      <section className="qa-block">
        <h2>What is EES?</h2>
        <p>
          The Entry/Exit System is an EU border system that electronically records when non-EU
          travellers enter and leave the Schengen area (biometrics and travel document data),
          replacing manual passport stamping for many travellers. Rollout timing and airport
          readiness can vary — check official updates before you travel.
        </p>
      </section>

      <section className="qa-block">
        <h2>Does EES change 90/180?</h2>
        <p>
          For planning, treat EES as a recording layer, not a replacement formula. The usual
          visa-free short-stay cap — 90 days in any rolling 180 across Schengen — is still what
          day-count tools estimate. Staywindow’s <Link to="/stay">Stay calculator</Link> remains an
          unofficial estimate. Read <Link to="/guide/90-180">how 90/180 is counted</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>EES vs ETIAS</h2>
        <p>
          <strong>EES</strong> is used at the border. <strong>ETIAS</strong> (when fully in force)
          is a travel authorisation you may need before travel. They are related but not the same
          product. Staywindow does not sell ETIAS and is not an application mill — see{' '}
          <Link to="/prep">trip prep</Link> for a checklist with official links only.
        </p>
        <ul className="link-list">
          <li>
            <a href={EU_EES_OVERVIEW} target="_blank" rel="noopener noreferrer">
              Official EES overview (travel-europe.europa.eu)
            </a>
          </li>
          <li>
            <a href={EU_ETIAS} target="_blank" rel="noopener noreferrer">
              Official ETIAS overview (travel-europe.europa.eu)
            </a>
          </li>
        </ul>
      </section>

      <section className="qa-block">
        <h2>What should I do?</h2>
        <p>
          Read the official EU pages, allow a little extra time at first EES registration, keep
          tracking your own 90/180 days, and confirm with the official calculator. Do not buy
          “EES packages” from random sites.
        </p>
      </section>

      <FaqDetails faqs={FAQS} />
    </>
  )
}
