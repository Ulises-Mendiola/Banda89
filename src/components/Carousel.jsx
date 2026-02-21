import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectFade, A11y } from 'swiper/modules'
import { useFadeIn } from '../hooks'
import { carouselSlides } from '../data'

// Swiper CSS
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function Carousel() {
    const [ref, visible] = useFadeIn(0.1)

    // Preload de imágenes del carrusel
    useEffect(() => {
        carouselSlides.forEach(({ src }) => {
            const img = new Image()
            img.src = src
        })
    }, [])

    return (
        <section
            id="galeria"
            ref={ref}
            className={`carousel-section section-fade ${visible ? 'visible' : ''}`}
            aria-label="Galería fotográfica de Banda 89"
        >
            <h2 className="section-title">GALERÍA</h2>
            <div className="gold-divider" aria-hidden="true" />

            <div className="carousel-wrapper">
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade, A11y]}
                    slidesPerView={1}
                    loop
                    autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    a11y={{
                        prevSlideMessage: 'Foto anterior',
                        nextSlideMessage: 'Foto siguiente',
                    }}
                    style={{ '--swiper-pagination-bottom': '14px' }}
                    aria-label="Carrusel de fotos de Banda 89"
                >
                    {carouselSlides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="swiper-slide-inner">
                                <img
                                    src={slide.src}
                                    alt={slide.caption}
                                    loading="lazy"
                                    decoding="async"
                                    style={{ width: '100%', height: '55vw', maxHeight: 480, minHeight: 220, objectFit: 'cover', display: 'block' }}
                                />
                                <div className="slide-caption">
                                    <h3>{slide.caption}</h3>
                                    <p>{slide.sub}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}
