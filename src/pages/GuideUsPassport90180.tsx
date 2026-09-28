import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'How many Schengen days does a US passport get?',
    a: 'For typical visa-free short stays, US passport holders usually use the shared 90 days in any rolling 180-day period across the Schengen area. Confirm current rules for your trip type.',
  },
  {
    q: 'Is it 90 days per country?',
    a: 'No. It is one pool across the Schengen countries that count. Spain plus Italy still draws from the same 90.',
  },
  {
    q: 'Do Ireland or the UK use my US Schengen days?',
    a: 'No. Ireland and the UK are outside Schengen. They have separate rules. Days there do not use or restore the Schengen pool.',
  },
  {
    q: 'Does EES change the 90/180 count for US travellers?',
    a: 'EES records crossings electronically. It does not invent a new day-count formula. You still plan against the usual short-stay rules and confirm officially.',
  },
]

export function GuideUsPassport90180() {
  return (
    <>
      <RouteMeta
        title="US passport Schengen 90/180 — how many days"
        description="US passport: usually 90 days in any rolling 180 across Schengen — one shared pool. Confirm with the official EU short-stay calculator."
        path="/guide/us-passport-90-180"
        faqs={FAQS}
      />
      <h1>US passport Schengen 90/180 — how many days</h1>
      <p className="lede">
        For typical visa-free short stays, a US passport usually means up to 90 days in any
        rolling 180-day period across the Schengen area — one shared pool, not 90 per country.
        Unofficial planner guide. Confirm with official sources before you travel.
      </p>

      <section className="qa-block">
        <h2>The usual US short-stay picture</h2>
        <p>
          Many US travellers ask “how many days do I get in Europe?” The precise answer depends
          on nationality rules, trip purpose, and whether you need a visa for a longer stay. For
          ordinary visa-free tourism and similar short stays, the figure people mean is the
          Schengen short-stay cap: 90 days inside any 180-day look-back across the countries that
          participate. Entry and exit days both count. The window rolls with your as-of date; it
          is not a calendar year and not a clean reset when you leave.
        </p>
        <p>
          Read the mechanics on <Link to="/guide/90-180">how 90/180 is counted</Link> and{' '}
          <Link to="/guide/when-days-reset">when days come back</Link>. List which places feed the
          pool on <Link to="/guide/schengen-countries">countries that count</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>One pool across 29 countries</h2>
        <p>
          Time in France, Germany, Spain, Italy, Greece, and the other Schengen members — including
          Iceland, Norway, Switzerland, and Liechtenstein — draws from the same 90 days. A two-week
          Spain trip plus a week in Italy is three weeks from one allowance, not two fresh pots.
          Overlapping stays on the same calendar day still count once.
        </p>
        <p>
          Ireland and Cyprus are EU members outside that pool for planning purposes. The UK is
          outside too. Days only in those places do not consume Schengen allowance and do not
          restore it — see <Link to="/guide/ireland-schengen">Ireland</Link>,{' '}
          <Link to="/guide/cyprus-schengen">Cyprus</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Layovers, EES, and ETIAS</h2>
        <p>
          A connection counts when you clear Schengen border control; airside transit without
          entering generally does not — details in the{' '}
          <Link to="/guide/layover-schengen">layover guide</Link>. The Entry/Exit System (EES)
          records crossings; it does not replace the 90/180 math with a different unofficial
          formula. ETIAS, when required for your travel, is a separate pre-travel authorisation
          topic — Staywindow does not sell ETIAS. Use official EU pages from{' '}
          <Link to="/ees">EES</Link> and <Link to="/prep">Prep</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>How to estimate, then confirm</h2>
        <p>
          Add Schengen entry and exit dates on the <Link to="/stay">Stay calculator</Link>. Treat
          the output as an unofficial estimate. Then run the same history through the{' '}
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            official EU short-stay calculator
          </a>
          . Prefer “under the usual cap (estimate)” over any promise of entry. Border decisions
          remain with the state.
        </p>
      </section>

      <FaqDetails faqs={FAQS} />

      <p className="unofficial-planner-note">
        Unofficial planner. Not the European Commission calculator.
      </p>
      <p>
        <Link to="/stay" className="btn btn-primary">
          Open Stay
        </Link>
      </p>
      <p>
        <Link to="/guide/schengen-countries">Countries that count</Link>
        {' · '}
        <Link to="/guide/90-180">90/180 explained</Link>
        {' · '}
        <Link to="/guide/uk-passport-90-180">UK passport guide</Link>
      </p>
    </>
  )
}
