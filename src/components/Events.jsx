import { useFadeIn, useParallax } from '../hooks'
import { eventos } from '../data'

/* ── Ticket Icon SVG ──────────────────────── */
function TicketIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 10V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4a2 2 0 0 1 0 4v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1 0-4ZM7 11h2v2H7v-2Zm4 0h2v2h-2v-2Zm4 0h2v2h-2v-2Z" />
        </svg>
    )
}

/* ── Map Pin Icon SVG ─────────────────────── */
function MapPinIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    )
}

/* ── Iconos Decorativos ─────────────────── */
function MusicNoteIcon({ size = 20, color = "rgba(212, 146, 10, 0.2)" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
    )
}

function StarIcon({ size = 16, color = "var(--gold)" }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
    )
}

/* ── Componente de Tarjeta Animada ────────── */
function EventCard({ event, index, featured = false }) {
    const [ref, visible] = useFadeIn(0.15, false)
    const isLeft = index % 2 === 0
    const delay = (index % 4) * 0.1 // Efecto escalonado (stagger)

    const revealClass = isLeft ? 'reveal-left' : 'reveal-right'

    if (featured) {
        return (
            <div
                ref={ref}
                className={`featured-event scroll-reveal-lateral ${revealClass} ${visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${delay}s` }}
            >
                <div className="featured-badge">PRÓXIMO SHOW</div>
                <a
                    href={event.link}
                    className="ticket-card ticket-featured"
                    aria-label={`Destacado: ${event.titulo} en ${event.lugar}`}
                >
                    <div className="ticket-date-section">
                        <span className="ticket-day">{event.dia}</span>
                        <span className="ticket-month">{event.mes}</span>
                    </div>

                    <div className="ticket-connector">
                        <div className="ticket-perforation top" />
                        <div className="ticket-line" />
                        <div className="ticket-perforation bottom" />
                    </div>

                    <div className="ticket-body">
                        <h3 className="ticket-title">{event.titulo}</h3>
                        <div className="ticket-location">
                            <MapPinIcon />
                            <span>{event.lugar}</span>
                        </div>
                        <div className={`ticket-status ${event.estado.toLowerCase().replace(' ', '-')}`}>
                            {event.estado}
                        </div>
                    </div>

                    <div className="ticket-action">
                        <button className="ticket-btn">
                            <TicketIcon />
                            <span>BOLETOS</span>
                        </button>
                    </div>
                </a>
            </div>
        )
    }

    return (
        <a
            ref={ref}
            href={event.link}
            className={`ticket-card scroll-reveal-lateral ${revealClass} ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: `${delay}s` }}
            aria-label={`${event.titulo} en ${event.lugar}`}
        >
            <div className="ticket-date-section">
                <span className="ticket-day">{event.dia}</span>
                <span className="ticket-month">{event.mes}</span>
            </div>

            <div className="ticket-connector">
                <div className="ticket-perforation top" />
                <div className="ticket-line" />
                <div className="ticket-perforation bottom" />
            </div>

            <div className="ticket-body">
                <h4 className="ticket-title-small">{event.titulo}</h4>
                <div className="ticket-location-small">
                    <MapPinIcon size={12} />
                    <span>{event.lugar}</span>
                </div>
            </div>

            <div className="ticket-action-compact">
                <div className={`ticket-status-dot ${event.estado.toLowerCase().replace(' ', '-')}`} />
                <span className="ticket-status-text">{event.estado}</span>
            </div>
        </a>
    )
}

export default function Events() {
    const [sectionRef, sectionVisible] = useFadeIn(0.1, true)
    const offsetSlow = useParallax(0.12)
    const offsetFast = useParallax(0.2)

    // El primer evento es el destacado
    const [proximoShow, ...restoEventos] = eventos

    return (
        <section
            id="fechas"
            ref={sectionRef}
            className={`events-section section-fade ${sectionVisible ? 'visible' : ''}`}
            aria-label="Próximas fechas de Banda 89"
        >
            <div className="floating-elements" aria-hidden="true">
                <div className="float-item note-4" style={{ transform: `translateY(${offsetSlow * -1.5}px)` }}>
                    <MusicNoteIcon size={45} color="rgba(212, 146, 10, 0.15)" />
                </div>
                <div className="float-item star-3" style={{ transform: `translateY(${offsetFast * 0.6}px)` }}>
                    <StarIcon size={28} color="rgba(212, 146, 10, 0.1)" />
                </div>
            </div>

            <h2 className="section-title">CARTELERA OFICIAL</h2>
            <p className="section-subtitle">Acompaña a Banda 89 en su gira 2025</p>
            <div className="gold-divider" aria-hidden="true" />

            <div className="events-container">
                {proximoShow && <EventCard event={proximoShow} index={0} featured={true} />}

                <div className="events-list">
                    {restoEventos.map((ev, idx) => (
                        <EventCard key={ev.id} event={ev} index={idx + 1} />
                    ))}
                </div>
            </div>
        </section>
    )
}
