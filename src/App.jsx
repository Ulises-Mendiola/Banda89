import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MusicSection from './components/MusicSection'
import Events from './components/Events'
import About from './components/About'
import Footer from './components/Footer'
import { carouselSlides } from './data'
import './App.css'

// ─── Preloader Component ─────────────────────────────
function Preloader({ hidden }) {
  return (
    <div
      id="preloader"
      className={`preloader ${hidden ? 'hidden' : ''}`}
      role="progressbar"
      aria-label="Cargando Banda 89…"
      aria-hidden={hidden}
    >
      <div className="preloader-logo">BANDA 89</div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" />
      </div>
    </div>
  )
}


// ─── Main App ────────────────────────────────────────
export default function App() {
  const [preloaderHidden, setPreloaderHidden] = useState(false)
  const [nowPlaying, setNowPlaying] = useState(null) // canción activa

  // Preload de imágenes + ocultar preloader de forma garantizada
  useEffect(() => {
    const imageUrls = carouselSlides.map((s) => s.src)

    // Iniciar carga en segundo plano
    imageUrls.forEach((url) => {
      const img = new Image()
      img.src = url
    })

    // Ocultar preloader después de un tiempo razonable para asegurar visibilidad
    const timer = setTimeout(() => {
      setPreloaderHidden(true)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Handler para "Now Playing"
  const handleNowPlaying = useCallback((cancion) => {
    setNowPlaying(cancion)
  }, [])

  return (
    <>
      {/* ── Preloader ────────────────── */}
      <Preloader hidden={preloaderHidden} />

      {/* ── Navbar (fijo) ────────────── */}
      <Navbar />

      {/* ── Contenido principal ──────── */}
      <main id="main-content" role="main">
        {/* Hero */}
        <Hero />

        {/* Música */}
        <MusicSection onNowPlaying={handleNowPlaying} />

        {/* Próximas fechas */}
        <Events />

        {/* Nosotros */}
        <About />
      </main>

      {/* ── Footer ───────────────────── */}
      <Footer />
    </>
  )
}
