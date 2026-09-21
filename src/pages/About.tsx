import { Link } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'

export function About() {
  return (
    <>
      <RouteMeta
        title="About — ClearStay"
        description="ClearStay is a calm travel-utility site for Schengen day counting and related trip tools. Not official advice."
      />
      <h1>About ClearStay</h1>
      <p className="lede">
        ClearStay is a small set of travel utilities: Schengen day counting, delay compensation
        bands, cabin bag size checks, and passport photo size guides.
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
