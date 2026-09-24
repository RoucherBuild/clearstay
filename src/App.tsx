import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Stay } from './pages/Stay'
import { Ees } from './pages/Ees'
import { Flights } from './pages/Flights'
import { Bags } from './pages/Bags'
import { Photo } from './pages/Photo'
import { Guide90180 } from './pages/Guide90180'
import { Faq } from './pages/Faq'
import { Prep } from './pages/Prep'
import { About } from './pages/About'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { Outside } from './pages/Outside'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/outside" element={<Outside />} />
        <Route path="/ees" element={<Ees />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/bags" element={<Bags />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/guide/90-180" element={<Guide90180 />} />
        <Route path="/prep" element={<Prep />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>
    </Routes>
  )
}
