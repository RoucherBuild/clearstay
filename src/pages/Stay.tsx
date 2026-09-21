import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { RouteMeta } from '../components/RouteMeta'
import {
  SCHENGEN_COUNTRIES,
  daysRemaining,
  daysUsed,
  nextFullStayDate,
  status,
  windowBounds,
  type Trip,
} from '../lib/schengen'
import {
  decodeTripsFromSearch,
  encodeTripsToSearch,
  loadTripsFromStorage,
  newTripId,
  saveTripsToStorage,
  todayYmd,
} from '../lib/tripsPersist'

const EXTRA_COUNTRIES = [
  'Ireland',
  'Cyprus',
  'United Kingdom',
  'United States',
  'Canada',
  'Australia',
  'Other / non-Schengen',
]

const SCHENGEN_SET = new Set<string>(SCHENGEN_COUNTRIES)
const COUNTRY_OPTIONS = [...SCHENGEN_COUNTRIES, ...EXTRA_COUNTRIES]


function statusLabel(s: 'Safe' | 'Tight' | 'Over'): string {
  if (s === 'Safe') return 'Under the usual cap (estimate)'
  if (s === 'Tight') return 'Tight (estimate)'
  return 'Over (estimate)'
}

function emptyDraft(): Omit<Trip, 'id'> {
  return {
    country: 'Spain',
    entry: todayYmd(),
    exit: todayYmd(),
    label: '',
  }
}

export function Stay() {
  const navigate = useNavigate()
  const location = useLocation()
  const [trips, setTrips] = useState<Trip[]>([])
  const [asOf, setAsOf] = useState(todayYmd())
  const [draft, setDraft] = useState(emptyDraft)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const fromUrl = decodeTripsFromSearch(location.search)
    if (fromUrl && (fromUrl.trips.length > 0 || fromUrl.asOf)) {
      setTrips(fromUrl.trips)
      if (fromUrl.asOf) setAsOf(fromUrl.asOf)
    } else {
      const stored = loadTripsFromStorage()
      if (stored) {
        setTrips(stored.trips)
        if (stored.asOf) setAsOf(stored.asOf)
      }
    }
    setHydrated(true)
    // Intentionally hydrate once from initial URL / storage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveTripsToStorage({ trips, asOf })
    const next = encodeTripsToSearch(trips, asOf)
    const current = location.search || ''
    if (next !== current) {
      navigate({ pathname: '/stay', search: next }, { replace: true })
    }
  }, [trips, asOf, hydrated, navigate, location.search])

  const computed = useMemo(() => {
    try {
      const used = daysUsed(trips, asOf)
      const remaining = daysRemaining(trips, asOf)
      const stayStatus = status(trips, asOf)
      const bounds = windowBounds(asOf)
      const nextFull = nextFullStayDate(trips, asOf)
      return { ok: true as const, used, remaining, stayStatus, bounds, nextFull }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid trip data'
      return { ok: false as const, error: msg }
    }
  }, [trips, asOf])

  const addTrip = useCallback(() => {
    if (!draft.entry || !draft.exit || !draft.country) return
    // Store draft.entry and draft.exit as separate strings exactly — never copy.
    const trip: Trip = {
      id: newTripId(),
      country: draft.country,
      entry: draft.entry,
      exit: draft.exit,
      ...(draft.label?.trim() ? { label: draft.label.trim() } : {}),
    }
    setTrips((prev) => [...prev, trip])
    setDraft(emptyDraft())
  }, [draft])

  const removeTrip = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id))
  }

  const loadSample = () => {
    setTrips([
      {
        id: newTripId(),
        country: 'Spain',
        entry: '2026-03-01',
        exit: '2026-03-10',
        label: 'Sample Spain',
      },
      {
        id: newTripId(),
        country: 'Italy',
        entry: '2026-03-05',
        exit: '2026-03-08',
        label: 'Sample Italy',
      },
    ])
    setAsOf('2026-03-10')
  }

  const usedPct = computed.ok ? Math.min(100, (computed.used / 90) * 100) : 0

  return (
    <>
      <RouteMeta
        title="Schengen stay calculator — Staywindow"
        description="Add trips and see days used and remaining in the rolling 180-day Schengen window. Data stays on this device."
      />
      <h1>Schengen stay calculator</h1>
      <p className="lede">
        Add entry/exit dates. Overlapping days count once. Non-Schengen countries contribute 0.
      </p>

      <div className="toolbar">
        <button type="button" className="btn btn-secondary" onClick={loadSample}>
          Load sample data
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            setTrips([])
            setAsOf(todayYmd())
          }}
        >
          Clear trips
        </button>
      </div>

      <section className="card form-card">
        <h2>As-of date</h2>
        <label className="field">
          <span>Calculate as of</span>
          <input
            type="date"
            value={asOf}
            onChange={(e) => setAsOf(e.target.value)}
            aria-describedby="asof-help"
          />
        </label>
        <p id="asof-help" className="muted">
          Defaults to today (YYYY-MM-DD). The 180-day window ends on this date.
        </p>
      </section>

      <section className="card form-card">
        <h2>Add a trip</h2>
        <div className="form-grid">
          <label className="field">
            <span>Country</span>
            <select
              value={draft.country}
              onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value }))}
            >
              {COUNTRY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                  {SCHENGEN_SET.has(c) ? '' : ' (non-Schengen)'}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Entry</span>
            <input
              type="date"
              value={draft.entry}
              onChange={(e) => {
                // Entry onChange must NOT overwrite exit. Leave exit alone.
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
              value={draft.label ?? ''}
              onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))}
              placeholder="e.g. Spring trip"
            />
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={addTrip}>
          Add trip
        </button>
      </section>

      <section className="card">
        <h2>Your trips ({trips.length})</h2>
        {trips.length === 0 ? (
          <p className="muted">No trips yet. Add one or load sample data.</p>
        ) : (
          <ul className="trip-list">
            {trips.map((t) => (
              <li key={t.id}>
                <div>
                  <strong>{t.country}</strong>
                  {t.label ? <span className="muted"> — {t.label}</span> : null}
                  <div className="muted">
                    {t.entry} → {t.exit}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-ghost btn-small"
                  onClick={() => removeTrip(t.id)}
                  aria-label={`Remove trip to ${t.country}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {!computed.ok && (
        <div className="card result-card status-over" role="alert">
          <p>{computed.error}</p>
        </div>
      )}

      {computed.ok && (
        <section
          className={`card result-card status-${computed.stayStatus.toLowerCase()}`}
          aria-live="polite"
        >
          <h2>Result</h2>
          <div className="result-hero">
            <span className="hero-remaining">{computed.remaining}</span>
            <span className="hero-remaining-label">days remaining</span>
          </div>
          <div className="result-numbers">
            <div>
              <span className="used-num">{computed.used}</span>
              <span className="num-label">days used</span>
            </div>
            <div>
              <span className={`status-pill status-${computed.stayStatus.toLowerCase()}`}>
                {statusLabel(computed.stayStatus)}
              </span>
              <span className="num-label">status</span>
            </div>
          </div>

          <div className="bar-block">
            <div className="bar-label">Toward 90-day limit ({computed.used} / 90)</div>
            <div
              className="progress-track"
              role="progressbar"
              aria-valuenow={computed.used}
              aria-valuemin={0}
              aria-valuemax={90}
              aria-label="Days used toward 90-day limit"
            >
              <div className="progress-fill" style={{ width: `${usedPct}%` }} />
            </div>
          </div>

          <p>
            <strong>180-day window:</strong> {computed.bounds.start} → {computed.bounds.end}
          </p>

          {computed.nextFull && (
            <p>
              <strong>Next full 90-day stay available from:</strong> {computed.nextFull}
            </p>
          )}
          {!computed.nextFull && computed.remaining === 90 && (
            <p className="muted">You currently have a full 90 days remaining.</p>
          )}

          <p className="disclaimer">
            This is not permission to travel. Border officers and EES records control.
          </p>
        </section>
      )}

    </>
  )
}
