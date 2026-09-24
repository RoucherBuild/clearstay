import { NavLink } from 'react-router-dom'
import {
  EU_EES_STAY_CHECKER,
  EU_SHORT_STAY_CALCULATOR,
} from '../lib/officialLinks'

/** Warm paper card explaining official EES checker vs Staywindow estimate. */
export function EesCompanionCard() {
  return (
    <section className="card ees-companion" aria-labelledby="ees-companion-title">
      <h2 id="ees-companion-title">EES companion</h2>
      <p>
        The EU Entry/Exit System (EES) digitally records when many non-EU travellers enter and
        leave the Schengen area. Officers and EES records — not this site — control what counts
        at the border.
      </p>
      <p>
        The official online “check how long you can stay” tool may not include travel from before
        full rollout, and can be incomplete depending on when and where you crossed. Treat it as
        one official resource, not a guarantee.
      </p>
      <p>
        Staywindow is an <strong>unofficial</strong> estimate from trips <strong>you</strong>{' '}
        enter on this device. We never claim to be EES and we never ask for passport numbers.
        Always confirm with official sources and border officers before you travel.
      </p>

      <ul className="link-list">
        <li>
          <a href={EU_EES_STAY_CHECKER} target="_blank" rel="noopener noreferrer">
            Official EES: check how long you can stay
          </a>
        </li>
        <li>
          <a href={EU_SHORT_STAY_CALCULATOR} target="_blank" rel="noopener noreferrer">
            Official EU short-stay calculator
          </a>
        </li>
        <li>
          <NavLink to="/ees">What is EES? (Staywindow guide)</NavLink>
        </li>
      </ul>

    </section>
  )
}
