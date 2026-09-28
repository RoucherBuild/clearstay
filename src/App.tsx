import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Stay } from './pages/Stay'
import { Ees } from './pages/Ees'
import { Flights } from './pages/Flights'
import { Bags } from './pages/Bags'
import { Photo } from './pages/Photo'
import { Guide90180 } from './pages/Guide90180'
import { GuideSchengenCountries } from './pages/GuideSchengenCountries'
import { GuideLayoverSchengen } from './pages/GuideLayoverSchengen'
import { GuideLayoverSchengenDays } from './pages/GuideLayoverSchengenDays'
import { GuideIrelandSchengen } from './pages/GuideIrelandSchengen'
import { GuideIrelandUkSchengen } from './pages/GuideIrelandUkSchengen'
import { GuideCyprusSchengen } from './pages/GuideCyprusSchengen'
import { GuideUsPassport90180 } from './pages/GuideUsPassport90180'
import { GuideUkPassport90180 } from './pages/GuideUkPassport90180'
import { GuideWhenDaysReset } from './pages/GuideWhenDaysReset'
import { GuideWhenSchengenDaysReset } from './pages/GuideWhenSchengenDaysReset'
import { BagsRyanairVsUnited } from './pages/BagsRyanairVsUnited'
import { FlightsEu261JfkLhr } from './pages/FlightsEu261JfkLhr'
import { Faq } from './pages/Faq'
import { Prep } from './pages/Prep'
import { About } from './pages/About'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/ees" element={<Ees />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/eu261-jfk-lhr" element={<FlightsEu261JfkLhr />} />
        <Route path="/bags" element={<Bags />} />
        <Route path="/bags/ryanair-vs-united" element={<BagsRyanairVsUnited />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/guide/90-180" element={<Guide90180 />} />
        <Route path="/guide/schengen-countries" element={<GuideSchengenCountries />} />
        <Route path="/guide/layover-schengen" element={<GuideLayoverSchengen />} />
        <Route path="/guide/ireland-schengen" element={<GuideIrelandSchengen />} />
        <Route path="/guide/cyprus-schengen" element={<GuideCyprusSchengen />} />
        <Route path="/guide/us-passport-90-180" element={<GuideUsPassport90180 />} />
        <Route path="/guide/uk-passport-90-180" element={<GuideUkPassport90180 />} />
        <Route path="/guide/when-days-reset" element={<GuideWhenDaysReset />} />
        {/* Old slugs → new (also 301 in public/_redirects) */}
        <Route path="/guide/layover-schengen-days" element={<GuideLayoverSchengenDays />} />
        <Route path="/guide/ireland-uk-schengen" element={<GuideIrelandUkSchengen />} />
        <Route path="/guide/when-schengen-days-reset" element={<GuideWhenSchengenDaysReset />} />
        <Route path="/prep" element={<Prep />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>
    </Routes>
  )
}
