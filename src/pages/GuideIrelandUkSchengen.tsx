import { Navigate } from 'react-router-dom'

/** Old slug → /guide/ireland-schengen (UK passport guide is separate). */
export function GuideIrelandUkSchengen() {
  return <Navigate to="/guide/ireland-schengen" replace />
}
