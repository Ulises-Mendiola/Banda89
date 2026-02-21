import { useState } from 'react'
import { useNavScroll } from '../hooks'
import { socialLinks } from '../data'
import { FacebookFilled, InstagramFilled, MenuOutlined, CloseOutlined } from '@ant-design/icons'

const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Música', href: '#musica' },
    { label: 'Fechas', href: '#fechas' },
    { label: 'Nosotros', href: '#nosotros' },
]

export default function Navbar() {
    const scrolled = useNavScroll(10)
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen((v) => !v)

    const handleNavClick = (href) => {
        setMenuOpen(false)
        const el = document.querySelector(href)
        if (el) {
            setTimeout(() => {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 200)
        }
    }

    return (
        <>
            {/* ─── NAVBAR BAR ─────────────────────── */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Navegación principal">
                {/* Logo */}
                <div className="nav-logo" aria-label="Banda 89 El Reencuentro Oficial">
                    BANDA 89
                    <span>El Reencuentro Oficial</span>
                </div>

                {/* Desktop Links */}
                <ul className="nav-links-desktop" role="list">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <a href={item.href} onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Hamburger Button (mobile) */}
                <button
                    id="hamburger-toggle"
                    className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
                    onClick={toggleMenu}
                    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-menu"
                >
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                    <span className="hamburger-line" />
                </button>
            </nav>

            {/* ─── MOBILE MENU OVERLAY ────────────── */}
            <div
                id="mobile-menu-overlay"
                className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
                onClick={() => setMenuOpen(false)}
                aria-hidden={!menuOpen}
            />

            {/* ─── MOBILE MENU DRAWER ─────────────── */}
            <div
                id="mobile-menu"
                className={`mobile-menu ${menuOpen ? 'open' : ''}`}
                role="dialog"
                aria-modal={menuOpen}
                aria-label="Menú de navegación"
            >
                {navItems.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className="mobile-menu-link"
                        onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                    >
                        {item.label}
                    </a>
                ))}

                {/* Social en el drawer */}
                <div style={{ marginTop: 'auto', display: 'flex', gap: 14, paddingTop: 30 }}>
                    <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn facebook"
                        aria-label="Facebook de Banda 89"
                    >
                        <FacebookFilled />
                    </a>
                    <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn instagram"
                        aria-label="Instagram de Banda 89"
                    >
                        <InstagramFilled />
                    </a>
                </div>
            </div>
        </>
    )
}
