import { useState, useEffect, useRef } from 'react'
import { useFadeIn } from '../hooks'

/* ── Iconos Decorativos ─────────────────── */
function StarIcon({ size = 16, color = "var(--gold)" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
    )
}

/* ── Contenido de la Narrativa ───────────── */
const storySections = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=800&q=80',
        title: 'EL ORIGEN',
        subtitle: 'Mazatlán, 1989',
        content: 'Banda 89 nació entre el viento y el metal, en el corazón de Sinaloa. No solo buscábamos tocar música, queríamos elevar el sonido sinaloense a niveles nunca antes vistos en los palenques de México.'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
        title: 'LA MAESTRÍA',
        subtitle: '30 Años de Tradición',
        content: 'Con 35 músicos de élite, perfeccionamos cada nota. La disciplina y la pasión nos convirtieron en el testimonio vivo de una era dorada, donde la música se siente en cada fibra del corazón.'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1514525253344-f814d0702117?w=800&q=80',
        title: 'EL REENCUENTRO',
        subtitle: '2025: Un Nuevo Capítulo',
        content: 'Tras un silencio necesario, regresamos. Banda 89 es la promesa de que lo bueno siempre vuelve. Estamos aquí para demostrar que la verdadera maestría no tiene fecha de caducidad.'
    }
]

export default function About() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [sectionRef, visible] = useFadeIn(0.1, true)

    // Referencias para cada "tarjeta de discurso"
    const cardRefs = useRef([])

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px', // Detectar cuando está cerca del centro
            threshold: 0.5
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index'))
                    setActiveIndex(index)
                }
            })
        }, observerOptions)

        cardRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <section
            id="nosotros"
            ref={sectionRef}
            className={`about-sticky-section section-fade ${visible ? 'visible' : ''}`}
        >
            <div className="about-sticky-grid">

                {/* 🎨 PANEL IZQUIERDO (Sticky Images) */}
                <div className="sticky-image-panel">
                    <div className="sticky-image-container">
                        {storySections.map((section, idx) => (
                            <img
                                key={section.id}
                                src={section.image}
                                alt={section.title}
                                className={`narrative-img ${activeIndex === idx ? 'active' : ''}`}
                            />
                        ))}

                        {/* El Badge de Experiencia se mantiene fijo sobre el panel */}
                        <div className="about-experience-badge-sticky">
                            <span className="exp-number">30</span>
                            <span className="exp-text">AÑOS DE<br />TRADICIÓN</span>
                        </div>
                    </div>
                </div>

                {/* 📝 PANEL DERECHO (Scrollable Speech Cards) */}
                <div className="narrative-content">
                    <div className="narrative-header">
                        <h2 className="about-title">NUESTRA HISTORIA</h2>
                        <div className="about-subtitle-premium">EL ALMA DE SINALOA</div>
                        <div className="gold-divider" style={{ margin: '0 0 40px 0' }} />
                    </div>

                    {storySections.map((section, idx) => (
                        <div
                            key={section.id}
                            className={`speech-card ${activeIndex === idx ? 'active' : ''}`}
                            data-index={idx}
                            ref={(el) => (cardRefs.current[idx] = el)}
                        >
                            <div className="card-number">0{section.id}</div>
                            <h3 className="card-title">{section.title}</h3>
                            <div className="card-subtitle">{section.subtitle}</div>
                            <p className="card-text">{section.content}</p>

                            {idx === 1 && (
                                <blockquote className="quote-block-mini">
                                    "La música no se toca, se siente en cada fibra."
                                </blockquote>
                            )}
                        </div>
                    ))}

                    {/* STATS AL FINAL DE LA NARRATIVA */}
                    <div className="about-stats-mini">
                        <div className="stat-item">
                            <span className="stat-val">35+</span>
                            <span className="stat-lab">DISCOS</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-val">35</span>
                            <span className="stat-lab">MÚSICOS</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
