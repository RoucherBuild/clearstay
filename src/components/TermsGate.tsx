import { useState } from 'react'
import { acceptTerms } from '../lib/termsGate'

type Props = {
  onAccepted: () => void
}

export function TermsGate({ onAccepted }: Props) {
  const [checked, setChecked] = useState(false)

  const handleContinue = () => {
    if (!checked) return
    acceptTerms()
    onAccepted()
  }

  return (
    <section className="card terms-gate" aria-labelledby="terms-gate-title">
      <h2 id="terms-gate-title">Unofficial estimate</h2>
      <p>
        Staywindow is unofficial. Numbers are estimates and can be wrong. This is not legal
        advice and not permission to travel or to claim money. Border officers, EES, airlines,
        and official EU/CAA pages control. Confirm with official sources before you rely on any
        figure.
      </p>
      <label className="field checkbox-field terms-gate-check">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span>
          I understand this is an unofficial estimate and I will confirm with official sources.
        </span>
      </label>
      <button
        type="button"
        className="btn btn-primary"
        disabled={!checked}
        onClick={handleContinue}
      >
        Continue
      </button>
    </section>
  )
}
