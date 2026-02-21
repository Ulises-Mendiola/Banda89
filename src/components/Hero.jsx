import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { carouselSlides } from '../data'
import { useParallax } from '../hooks'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'

export default function Hero() {
    const offset = useParallax(0.2) // Recibe el valor numérico, no un ref

    return (
        <section id="inicio" className="hero-section" aria-label="Sección de bienvenida de Banda 89">
            {/* Background Carousel */}
            <div className="hero-carousel-container">
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    loop={true}
                    className="hero-swiper"
                >
                    {carouselSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div
                                className="hero-slide-bg"
                                style={{
                                    backgroundImage: `url(${slide.src})`,
                                    transform: `scale(1.05) translateY(${offset * 0.5}px)`
                                }}
                                role="img"
                                aria-label={slide.caption}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Deep overlay for text readability */}
                <div className="hero-overlay" aria-hidden="true" />
            </div>

            {/* Content Overlay */}
            <div
                className="hero-content"
                style={{ transform: `translateY(${offset * -0.3}px)` }}
            >
                <div className="hero-badge" aria-label="Información de la banda">
                    <span role="img" aria-label="Trompeta">🎺</span> REGIONAL MEXICANO · DESDE 1989
                </div>

                <h1 className="hero-title">
                    BANDA 89
                    <span className="hero-subtitle">EL REENCUENTRO OFICIAL</span>
                </h1>

                <p className="hero-description">
                    Más de tres décadas llevando el alma de Sinaloa a cada rincón de
                    México. La música que mueve al corazón, al cuerpo y a la memoria.
                </p>

                <div className="hero-actions">
                    <a
                        href="#musica"
                        className="btn btn-primary"
                        aria-label="Escuchar nuestra música"
                    >
                        <span role="img" aria-label="Música">🎵</span> Escúchanos
                    </a>
                    <a
                        href="#eventos"
                        className="btn btn-outline"
                        aria-label="Ver próximas fechas de conciertos"
                    >
                        <span role="img" aria-label="Calendario">📅</span> Próximas Fechas
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero-scroll-indicator" aria-hidden="true">
                <span>DESLIZA</span>
                <div className="arrow-down" />
            </div>
        </section>
    )
}
