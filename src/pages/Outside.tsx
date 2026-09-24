import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import { NON_SCHENGEN_ZONES, type NonSchengenZoneId } from '../lib/nonSchengenZones'
import {
  getZoneTrips,
  isValidNonSchengenTripRange,
  loadNonSchengenStore,
  newNonSchengenTripId,
  saveNonSchengenStore,
  sumInclusiveDays,
  tripInclusiveDays,
  type NonSchengenStore,
  type NonSchengenTrip,
} from '../lib/nonSchengenPersist'
import { todayYmd } from '../lib/tripsPersist'

function emptyDraft() {
  const today = todayYmd()
  return { entry: today, exit: today, label: '' }
}

export function Outside() {
  const [store, setStore] = useState<NonSchengenStore>({})
  const [zoneId, setZoneId] = useState<NonSchengenZoneId>('uk')
  const [draft, setDraft] = useState(emptyDraft)
  const [formError, setFormError] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setStore(loadNonSchengenStore())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveNonSchengenStore(store)
  }, [store, hydrated])

  const zone = NON_SCHENGEN_ZONES.find((z) => z.id === zoneId)!
  const trips = getZoneTrips(store, zoneId)
  const totalDays = useMemo(() => {
    try {
      return sumInclusiveDays(trips)
    } catch {
      return 0
    }
  }, [trips])

  const setZoneTrips = useCallback(
    (next: NonSchengenTrip[]) => {
      setStore((prev) => ({ ...prev, [zoneId]: next }))
    },
    [zoneId],
  )

  const addTrip = () => {
    setFormError(null)
    if (!draft.entry || !draft.exit) {
      setFormError('Enter both entry and exit dates.')
      return
    }
    if (!isValidNonSchengenTripRange(draft.entry, draft.exit)) {
      setFormError('Exit must be on or after entry (YYYY-MM-DD).')
      return
    }
    const trip: NonSchengenTrip = {
      id: newNonSchengenTripId(),
      entry: draft.entry,
      exit: draft.exit,
      ...(draft.label.trim() ? { label: draft.label.trim() } : {}),
    }
    setZoneTrips([...trips, trip])
    setDraft(emptyDraft())
  }

  const removeTrip = (id: string) => {
    setZoneTrips(trips.filter((t) => t.id !== id))
  }

  const clearZone = () => {
    setZoneTrips([])
  }

  return (
    <>
      <RouteMeta
        title="Outside Schengen — Staywindow"
        description="Track UK, Ireland, Cyprus, Western Balkans, and Türkiye stay days separately from Schengen 90/180. Plain inclusive day counts on this device."
      />
      <h1>Outside Schengen</h1>
      <p className="lede">
        Simple inclusive day counts for common non-Schengen zones. Not a visa calculator and not
        Schengen 90/180.
      </p>

      <div className="outside-banner" role="status">
        <p>
          These days do <strong>not</strong> count toward the Schengen 90/180 estimate on{' '}
          <NavLink to="/stay">Stay</NavLink>.
        </p>
        <p className="muted small">
          Do not mix UK / Ireland / Cyprus / Balkans / Türkiye days into your Schengen window.
          Limits below are cautious notes only — check official rules for your nationality.
        </p>
      </div>

      <section className="card form-card">
        <h2>Zone</h2>
        <div className="chip-row" role="tablist" aria-label="Non-Schengen zone">
          {NON_SCHENGEN_ZONES.map((z) => (
            <button
              key={z.id}
              type="button"
              role="tab"
              aria-selected={z.id === zoneId}
              className={z.id === zoneId ? 'chip active' : 'chip'}
              onClick={() => {
                setZoneId(z.id)
                setFormError(null)
              }}
            >
              {z.label}
            </button>
          ))}
        </div>
        <p className="zone-note">{zone.note}</p>
        {zone.countries ? (
          <p className="muted small">
            Group covers: {zone.countries.join(', ')}. Rules differ by country.
          </p>
        ) : null}
        {zone.officialUrl ? (
          <p className="muted small">
            Official:{' '}
            <a href={zone.officialUrl} target="_blank" rel="noopener noreferrer">
              {zone.officialUrl.replace(/^https?:\/\//, '')}
            </a>
          </p>
        ) : null}
      </section>

      <section className="card form-card">
        <h2>Add a stay — {zone.label}</h2>
        <div className="form-grid">
          <label className="field">
            <span>Entry</span>
            <input
              type="date"
              value={draft.entry}
              onChange={(e) => {
                const entry = e.target.value
                setDraft((d) => ({ ...d, entry }))
              }}
            />
          </label>
          <label className="field">
            <span>Exit</span>
            <input
              type="date"
              value={draft.exit}
              onChange={(e) => setDraft((d) => ({ ...d, exit: e.target.value }))}
            />
          </label>
          <label className="field">
            <span>Label (optional)</span>
            <input
              type="text"
              value={draft.label}
              onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))}
              placeholder="e.g. London week"
            />
          </label>
        </div>
        {formError ? (
          <p className="field-error" role="alert">
            {formError}
          </p>
        ) : null}
        <div className="toolbar">
          <button type="button" className="btn btn-primary" onClick={addTrip}>
            Add stay
          </button>
          <button type="button" className="btn btn-ghost" onClick={clearZone} disabled={trips.length === 0}>
            Clear this zone
          </button>
        </div>
      </section>

      <section className="card">
        <h2>
          Stays in {zone.label} ({trips.length})
        </h2>
        <p className="result-line">
          <strong>Total inclusive days:</strong> {totalDays}
        </p>
        <p className="muted small">
          Sum of each stay’s inclusive calendar days. Overlapping trips are counted separately —
          adjust manually if you need a merged total.
        </p>
        {trips.length === 0 ? (
          <p className="muted">No stays yet for this zone.</p>
        ) : (
          <ul className="trip-list">
            {trips.map((t) => {
              let days = 0
              try {
                days = tripInclusiveDays(t)
              } catch {
                days = 0
              }
              return (
                <li key={t.id}>
                  <div>
                    <strong>
                      {t.entry} → {t.exit}
                    </strong>
                    {t.label ? <span className="muted"> — {t.label}</span> : null}
                    <div className="muted">{days} day{days === 1 ? '' : 's'} (inclusive)</div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost btn-small"
                    onClick={() => removeTrip(t.id)}
                    aria-label={`Remove stay ${t.entry} to ${t.exit}`}
                  >
                    Remove
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <p className="disclaimer" role="note">
        Unofficial day counter only. Not permission to travel. Confirm visa / ETA / entry rules
        with official sources. For Schengen 90/180, use <Link to="/stay">Stay</Link>.
      </p>
    </>
  )
}
