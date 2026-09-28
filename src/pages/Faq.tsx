import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { FaqDetails } from '../components/FaqDetails'
import { EU_SHORT_STAY_CALCULATOR } from '../lib/officialLinks'

const FAQS = [
  {
    q: 'Is Staywindow official?',
    a: 'No. We are an independent unofficial planner. Always verify with official EU sources, including the official EU short-stay calculator.',
  },
  {
    q: 'Do you store my trips on a server?',
    a: 'No accounts in v1. Trips live in your browser (localStorage) and optionally in the share URL.',
  },
  {
    q: 'Do you file flight delay claims?',
    a: 'No. The flights tool shows rough EU261/UK261 money bands only. We are not a claim company.',
  },
  {
    q: 'Will this get me a visa or ETIAS?',
    a: 'No. We do not sell visas or ETIAS. Use official EU pages linked from EES and Prep.',
  },
  {
    q: 'Do UK / Ireland / Cyprus days count toward Schengen 90/180?',
    a: 'No. Time in the UK, Ireland, or Cyprus does not count toward the shared Schengen pool — check each country’s own rules separately.',
  },
]

export function Faq() {
  return (
    <>
      <RouteMeta
        title="Staywindow FAQ — 90/180, bags, delays"
        description="Staywindow FAQ: Schengen 90/180 calculator, cabin bags, EU261 delay bands, privacy, and what we do not do. Unofficial planner."
        path="/faq"
        faqs={FAQS}
      />
      <h1>Staywindow FAQ — 90/180, bags, delays</h1>
      <p className="lede">
        Short answers about the Schengen day calculator, bags, delay bands, and privacy. Confirm
        day counts with the{' '}
        <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
          official EU short-stay calculator
        </a>
        .
      </p>

      <section className="qa-block">
        <h2>Is Staywindow official?</h2>
        <p>No. We are an independent planning tool. Always verify with official EU sources.</p>
      </section>

      <section className="qa-block">
        <h2>Do you store my trips on a server?</h2>
        <p>
          No accounts in v1. Trips live in your browser (localStorage) and optionally in the
          share URL. See <Link to="/privacy">Privacy</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Can I share my calculation?</h2>
        <p>
          Yes — on the <Link to="/stay">Stay</Link> page the URL updates with your trips so you
          can copy the link.
        </p>
      </section>

      <section className="qa-block">
        <h2>Do you file flight delay claims?</h2>
        <p>
          No. The flights tool shows rough EU261/UK261 money <em>bands</em> only. We are not a
          claim company. See <Link to="/flights">Flights</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Will this get me a visa or ETIAS?</h2>
        <p>
          No. We do not sell visas or ETIAS. For EES/ETIAS, use official EU pages linked from{' '}
          <Link to="/ees">EES</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Do UK / Ireland / Cyprus days count toward Schengen 90/180?</h2>
        <p>
          No. Time in the UK, Ireland, or Cyprus does not count toward Schengen 90/180 — check
          each country&apos;s own rules separately. Guides:{' '}
          <Link to="/guide/ireland-schengen">Ireland</Link>,{' '}
          <Link to="/guide/cyprus-schengen">Cyprus</Link>,{' '}
          <Link to="/guide/uk-passport-90-180">UK passport</Link>.
        </p>
      </section>

      <section className="qa-block">
        <h2>Which countries use my 90 Schengen days?</h2>
        <p>
          One shared pool across 29 Schengen countries. Ireland, Cyprus and the UK do not
          count. See{' '}
          <Link to="/guide/schengen-countries">Which countries count toward Schengen 90/180?</Link>
          .
        </p>
      </section>

      <section className="qa-block">
        <h2>Cabin bags and photo sizes?</h2>
        <p>
          Compare airline cabin limits on <Link to="/bags">Bags</Link>. Check passport / visa
          print sizes on <Link to="/photo">Photo</Link>.
        </p>
      </section>

      <FaqDetails faqs={FAQS} />
    </>
  )
}
