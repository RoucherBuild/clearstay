import { useMemo, useState } from 'react'
import { SCHENGEN_COUNTRIES } from '../lib/schengen'
import { previewStayWithTrip, type ProposedTrip } from '../lib/stayPreview'
import { todayYmd } from '../lib/tripsPersist'

function statusLabel(s: 'Safe' | 'Tight' | 'Over'): string {
  if (s === 'Safe') return 'Under the usual cap (estimate)'
  if (s === 'Tight') return 'Tight (estimate)'
  return 'Over (estimate)'
}

function emptyProposal(): ProposedTrip {
  return {
    country: 'Spain',
    entry: todayYmd(),
    exit: todayYmd(),
  }
}

type Props = {
  trips: Parameters<typeof previewStayWithTrip>[0]
  asOf: string
  onAddTrip: (proposed: ProposedTrip) => void
}

export function StayNextTripFit({ trips, asOf, onAddTrip }: Props) {
  const [proposal, setProposal] = useState(emptyProposal)

  const datesFilled = Boolean(proposal.entry && proposal.exit && proposal.country)
  const exitBeforeEntry =
    datesFilled && proposal.exit < proposal.entry

  const preview = useMemo(() => {
    if (!datesFilled || exitBeforeEntry) return null
    try {
      return previewStayWithTrip(trips, asOf, proposal)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid trip dates'
      return { error: msg } as const
    }
  }, [trips, asOf, proposal, datesFilled, exitBeforeEntry])

  const canAdd =
    datesFilled &&
    !exitBeforeEntry &&
    preview != null &&
    !('error' in preview)

  const handleAdd = () => {
    if (!canAdd) return
    onAddTrip({
      country: proposal.country,
      entry: proposal.entry,
      exit: proposal.exit,
    })
    setProposal(emptyProposal())
  }

  const overBy =
    preview && !('error' in preview) && preview.used > 90
      ? preview.used - 90
      : 0

  return (
    <section className="card form-card next-trip-fit">
      <h2>Will this next trip fit? (estimate)</h2>
      <p className="muted small">
        Dry-run only — does not add to your trips until you click Add.
      </p>
      <div className="form-grid">
        <label className="field">
          <span>Country</span>
          <select
            value={proposal.country}
            onChange={(e) =>
              setProposal((p) => ({ ...p, country: e.target.value }))
            }
          >
            {SCHENGEN_COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Entry</span>
          <input
            type="date"
            value={proposal.entry}
            onChange={(e) => {
              const entry = e.target.value
              setProposal((p) => ({ ...p, entry }))
            }}
          />
        </label>
        <label className="field">
          <span>Exit</span>
          <input
            type="date"
            value={proposal.exit}
            onChange={(e) =>
              setProposal((p) => ({ ...p, exit: e.target.value }))
            }
          />
        </label>
      </div>

      {exitBeforeEntry && (
        <p className="field-error" role="alert">
          Exit ({proposal.exit}) is before entry ({proposal.entry}).
        </p>
      )}

      {preview && 'error' in preview && (
        <p className="field-error" role="alert">
          {preview.error}
        </p>
      )}

      {preview && !('error' in preview) && (
        <div
          className={`preview-result status-${preview.status.toLowerCase()}`}
          aria-live="polite"
        >
          <p>
            <strong>With this trip (estimate):</strong> {preview.used} days used
            / {preview.remaining} remaining
          </p>
          <p>
            <span className={`status-pill status-${preview.status.toLowerCase()}`}>
              {statusLabel(preview.status)}
            </span>
          </p>
          {overBy > 0 && (
            <p className="over-by">
              About {overBy} day{overBy === 1 ? '' : 's'} over the usual 90-day
              cap (estimate).
            </p>
          )}
        </div>
      )}

      <p className="disclaimer">
        Unofficial estimate — confirm with official sources before you travel.
      </p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAdd}
        disabled={!canAdd}
      >
        Add this trip
      </button>
    </section>
  )
}
