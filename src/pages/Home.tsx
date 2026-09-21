import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'

export function Home() {
  return (
    <>
      <RouteMeta
        title="ClearStay — How many Europe days do you have left?"
        description="Check Schengen 90/180 days left, flight delay bands, cabin bag limits, and passport photo sizes. Free planning tools — data stays on your device."
      />
      <section className="hero-block">
        <h1>How many Europe days do you have left?</h1>
        <p className="lede">
          ClearStay helps visa-free travellers track the Schengen 90/180 rule and related trip
          utilities. Calm numbers, no sales pitch.
        </p>
        <div className="cta-row">
          <Link to="/stay" className="btn btn-primary">
            Check my Schengen days
          </Link>
          <Link to="/flights" className="btn btn-secondary">
            My flight was delayed
          </Link>
        </div>
      </section>

      <section className="tile-grid" aria-label="Tools">
        <Link to="/stay" className="tile">
          <h2>Schengen stay</h2>
          <p>Rolling 90/180 day calculator with shareable trip list.</p>
        </Link>
        <Link to="/flights" className="tile">
          <h2>Flight delay</h2>
          <p>EU261 / UK261 compensation bands — estimate only.</p>
        </Link>
        <Link to="/bags" className="tile">
          <h2>Cabin bags</h2>
          <p>Compare typical airline size limits side by side.</p>
        </Link>
        <Link to="/photo" className="tile">
          <h2>Passport photo</h2>
          <p>Print sizes and DPI notes for common passport presets.</p>
        </Link>
      </section>

      <section className="who-block">
        <h2>Who this is for</h2>
        <ul>
          <li>
            <strong>For:</strong> visa-free short-stay travellers checking Schengen days,
            packing cabin bags, or understanding delay compensation bands.
          </li>
          <li>
            <strong>Not for:</strong> buying visas, filing claims, or treating this as official
            government advice. We are not a visa shop, not official, and not a claim company.
          </li>
        </ul>
      </section>
    </>
  )
}
