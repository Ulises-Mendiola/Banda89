import { useEffect, useRef, useState } from 'react'

/**
 * Hook que detecta cuando un elemento entra al viewport
 * y dispara la animación fade-in + parallax.
 */
export function useFadeIn(threshold = 0.15, triggerOnce = false) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (triggerOnce) {
                    if (entry.isIntersecting) setVisible(true)
                } else {
                    setVisible(entry.isIntersecting)
                }
            },
            { threshold }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold, triggerOnce])

    return [ref, visible]
}

/**
 * Hook para efecto parallax sutil al hacer scroll.
 * Devuelve el offset Y actual para aplicar al bg.
 */
export function useParallax(speed = 0.3) {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        let ticking = false
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setOffset(window.scrollY * speed)
                    ticking = false
                })
                ticking = true
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [speed])

    return offset
}

/**
 * Hook que devuelve true si el navbar debe mostrar
 * el fondo sólido (cuando el usuario hace scroll).
 */
export function useNavScroll(threshold = 10) {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [threshold])

    return scrolled
}

/**
 * Preloads a list of image urls into the browser cache.
 */
export function preloadImages(urls) {
    urls.forEach((url) => {
        const img = new Image()
        img.src = url
    })
}
/**
 * Hook que devuelve el porcentaje de scroll de la página (0 a 100).
 */
export function useScrollProgress() {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight
            const currentScroll = window.scrollY
            if (totalScroll > 0) {
                setProgress((currentScroll / totalScroll) * 100)
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return progress
}
