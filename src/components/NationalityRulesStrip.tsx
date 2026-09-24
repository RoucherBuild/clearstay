import { useEffect, useId, useState } from 'react'
import {
  NATIONALITY_RULES,
  getNationalityRule,
  loadNationalityId,
  saveNationalityId,
  type NationalityId,
} from '../lib/nationalityRules'

/** Cautious checklist strip for US/UK/AU/CA passport holders — not legal advice. */
export function NationalityRulesStrip() {
  const selectId = useId()
  const [nationalityId, setNationalityId] = useState<NationalityId | ''>('')

  useEffect(() => {
    setNationalityId(loadNationalityId())
  }, [])

  const rule = getNationalityRule(nationalityId)

  const onChange = (value: string) => {
    const next =
      value === 'US' || value === 'UK' || value === 'AU' || value === 'CA' ? value : ''
    setNationalityId(next)
    saveNationalityId(next)
  }

  return (
    <section className="card nationality-rules" aria-labelledby="nationality-rules-title">
      <h2 id="nationality-rules-title">Nationality checklist</h2>
      <p className="muted">
        Unofficial checklist for visa-free short-stay travellers — not legal advice, and not
        affiliated with any government or the EU.
      </p>

      <label className="field" htmlFor={selectId}>
        <span>Travelling on a passport from…</span>
        <select id={selectId} value={nationalityId} onChange={(e) => onChange(e.target.value)}>
          <option value="">Choose…</option>
          {NATIONALITY_RULES.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </label>

      {rule && (
        <div className="nationality-rules-body">
          <h3>
            Checklist for {rule.label} travellers <span className="muted">(not legal advice)</span>
          </h3>
          <ul className="plain-list">
            {rule.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <ul className="link-list">
            {rule.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
