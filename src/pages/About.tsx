import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'

export function About() {
  return (
    <>
      <RouteMeta
        title="About — Staywindow"
        description="Staywindow is a calm travel-utility site for Schengen day counting and related trip tools. Not official advice."
      />
      <h1>About Staywindow</h1>
      <p className="lede">
        Staywindow is a small set of travel utilities: Schengen day counting, delay compensation
        bands, cabin bag size checks, and passport photo size guides.
      </p>
      <p className="disclaimer" role="note">
        Staywindow is an independent unofficial tool. It has no affiliation with the EU, any
        state, or any airline.
      </p>
      <p>
        We aim for high-contrast numbers and honest disclaimers. We are not a government site,
        not a visa shop, and not a claim company.
      </p>
      <p>
        Start with the <Link to="/stay">stay calculator</Link> or read the{' '}
        <Link to="/guide/90-180">90/180 guide</Link>.
      </p>
    </>
  )
}
