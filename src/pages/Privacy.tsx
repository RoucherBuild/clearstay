import { RouteMeta } from '../components/RouteMeta'

export function Privacy() {
  return (
    <>
      <RouteMeta
        title="Privacy — ClearStay"
        description="ClearStay v1 has no accounts and no analytics. Trip data stays in localStorage and optional share URLs on your device."
      />
      <h1>Privacy</h1>
      <p className="lede">Short and honest for v1.</p>
      <ul className="plain-list">
        <li>
          <strong>No accounts.</strong> You do not sign in.
        </li>
        <li>
          <strong>Trip data on this device.</strong> The stay calculator stores trips in{' '}
          <code>localStorage</code> (<code>clearstay.trips.v1</code>) and can encode them in the
          page URL so you can share a link.
        </li>
        <li>
          <strong>No analytics in v1.</strong> We do not load tracking scripts.
        </li>
        <li>
          <strong>No photo upload to a server.</strong> Passport photo preview (if used) stays
          in your browser via <code>createObjectURL</code>.
        </li>
        <li>
          <strong>Clearing data.</strong> Clear site data in your browser, or remove trips in the
          stay tool. Shared links only expose what you put in the URL.
        </li>
      </ul>
    </>
  )
}
