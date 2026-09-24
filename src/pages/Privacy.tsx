import { RouteMeta } from '../components/RouteMeta'

export function Privacy() {
  return (
    <>
      <RouteMeta
        title="Privacy — Staywindow"
        description="Staywindow v1 has no accounts and no analytics. Trip data stays in localStorage and optional share URLs on your device."
      />
      <h1>Privacy</h1>
      <p className="lede">Short and honest for v1.</p>
      <p className="disclaimer" role="note">
        Staywindow is an independent unofficial tool. It has no affiliation with the EU, any
        state, or any airline.
      </p>
      <p className="contact-line">
        Contact: <a href="mailto:hello@thestaywindow.com">hello@thestaywindow.com</a>
      </p>
      <ul className="plain-list">
        <li>
          <strong>No accounts.</strong> You do not sign in.
        </li>
        <li>
          <strong>Trip data on this device.</strong> The stay calculator stores trips in{' '}
          <code>localStorage</code> (<code>staywindow.trips.v1</code>) and can encode them in the
          page URL so you can share a link.
        </li>
        <li>
          <strong>Border prep checklist.</strong> Checked items on the prep page stay in{' '}
          <code>localStorage</code> (<code>staywindow.prep.v1</code>) on this device only.
        </li>
        <li>
          <strong>Outside Schengen stays.</strong> Non-Schengen day helpers store zone trips in{' '}
          <code>localStorage</code> (<code>staywindow.nonSchengen.v1</code>) on this device only —
          separate from Schengen trips.
        </li>
        <li>
          <strong>No analytics in v1.</strong> We do not load tracking scripts.
        </li>
        <li>
          <strong>No photo upload to a server.</strong> Passport photo, stamp, and boarding-pass
          previews (if used) stay in your browser via <code>createObjectURL</code> — images are
          not sent to a server.
        </li>
        <li>
          <strong>Clearing data.</strong> Clear site data in your browser, or remove trips in the
          stay tool. Shared links only expose what you put in the URL.
        </li>
      </ul>
    </>
  )
}
