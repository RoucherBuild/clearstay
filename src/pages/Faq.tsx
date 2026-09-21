import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'

export function Faq() {
  return (
    <>
      <RouteMeta
        title="FAQ — Staywindow"
        description="Short answers about Staywindow’s Schengen calculator, privacy, and what we do not do."
      />
      <h1>FAQ</h1>

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
          claim company.
        </p>
      </section>

      <section className="qa-block">
        <h2>Will this get me a visa or ETIAS?</h2>
        <p>
          No. We do not sell visas or ETIAS. For EES/ETIAS, use official EU pages linked from{' '}
          <Link to="/ees">EES</Link>.
        </p>
      </section>
    </>
  )
}
