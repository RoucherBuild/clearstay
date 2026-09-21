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
import { About } from './pages/About'
import { Privacy } from './pages/Privacy'
import './App.css'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/ees" element={<Ees />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/bags" element={<Bags />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/guide/90-180" element={<Guide90180 />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>
    </Routes>
  )
}
