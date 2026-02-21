import { useState, useRef, useEffect, useCallback } from 'react'
import { useFadeIn } from '../hooks'
import { canciones, streamingLinks } from '../data'

/* ── Iconos del Reproductor ──────────────── */
function PlayIcon({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.14v14l11-7-11-7z" />
        </svg>
    )
}

function PauseIcon({ size = 24 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
    )
}

function PrevIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
        </svg>
    )
}

function NextIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
        </svg>
    )
}

/* ── Iconos de Plataformas ─────────────── */
function SpotifyIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.311c-.221.36-.688.472-1.049.251-2.909-1.777-6.569-2.177-10.88-1.191-.413.099-.824-.162-.924-.575-.1-.413.162-.824.575-.924 4.717-1.078 8.761-.624 12.027 1.371.361.221.472.689.251 1.049zm1.469-3.262c-.278.452-.865.594-1.317.317-3.33-2.046-8.406-2.642-12.344-1.446-.511.155-1.053-.133-1.208-.644-.155-.511.133-1.053.644-1.208 4.507-1.367 10.103-.701 13.908 1.635.452.278.594.865.317 1.317zm.127-3.411c-.332.544-1.042.712-1.586.381-3.908-2.321-10.347-2.536-14.103-1.396-.613.186-1.261-.164-1.447-.777s.164-1.261.777-1.447c4.484-1.361 11.603-1.107 16.141 1.586a1.144 1.144 0 0 1 .218 1.653z" />
        </svg>
    )
}

function YouTubeIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
    )
}


function AppleIcon({ size = 20 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.539 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.67-1.48 3.671-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.025-.013-3.182-1.221-3.22-4.857-.026-3.039 2.48-4.5 2.597-4.571-1.428-2.091-3.636-2.325-4.415-2.364-2.065-.168-3.926 1.221-4.88 1.221zm1.611-4.013c.844-1.026 1.411-2.455 1.258-3.883-1.228.052-2.716.819-3.597 1.844-.793.91-1.487 2.368-1.298 3.766 1.365.104 2.766-.714 3.637-1.727z" />
        </svg>
    )
}

/* ── Ecualizador Mini ────────────────── */
function Equalizer() {
    return (
        <div className="mini-eq" aria-hidden="true">
            {[0.6, 1, 0.4].map((ratio, i) => (
                <span key={i} className="eq-bar" style={{ animationDelay: `${i * 0.15}s`, height: `${ratio * 100}%` }} />
            ))}
        </div>
    )
}

export default function MusicSection({ onNowPlaying }) {
    const [ref, visible] = useFadeIn(0.12)
    const [highlightedSong, setHighlightedSong] = useState(canciones[0])
    const [playlist, setPlaylist] = useState(canciones.slice(1))
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)

    const audioRef = useRef(null)
    const intervalRef = useRef(null)

    // Sincronizar con el estado global de reproducción (si existe)
    useEffect(() => () => {
        audioRef.current?.pause()
        clearInterval(intervalRef.current)
    }, [])

    const startProgress = useCallback(() => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            const a = audioRef.current
            if (!a || a.paused) return
            setProgress((a.currentTime / (a.duration || 1)) * 100)
        }, 300)
    }, [])

    const togglePlay = useCallback(() => {
        if (!audioRef.current) {
            const a = new Audio(highlightedSong.audioSrc)
            a.volume = 0.8
            audioRef.current = a
            a.addEventListener('ended', () => setIsPlaying(false))
        }

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
            clearInterval(intervalRef.current)
        } else {
            audioRef.current.play().catch(() => { })
            setIsPlaying(true)
            startProgress()
        }
    }, [highlightedSong, isPlaying, startProgress])

    const handleSwap = (newSong) => {
        // Pausar reproducción actual
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current = null
        }
        setIsPlaying(false)
        setProgress(0)
        clearInterval(intervalRef.current)

        // Lógica de intercambio (Swap)
        const oldHighlighted = highlightedSong
        const newPlaylist = playlist.filter(s => s.id !== newSong.id)

        setHighlightedSong(newSong)
        setPlaylist([oldHighlighted, ...newPlaylist])

        // Auto-play la nueva destacada
        setTimeout(() => {
            const a = new Audio(newSong.audioSrc)
            a.volume = 0.8
            audioRef.current = a
            a.play().catch(() => { })
            setIsPlaying(true)
            startProgress()
            onNowPlaying(newSong)
        }, 100)
    }

    const goNext = useCallback(() => {
        if (playlist.length > 0) {
            handleSwap(playlist[0])
        }
    }, [playlist, handleSwap])

    const goPrev = useCallback(() => {
        if (playlist.length > 0) {
            handleSwap(playlist[playlist.length - 1])
        }
    }, [playlist, handleSwap])

    return (
        <section
            id="musica"
            ref={ref}
            className={`music-player-section section-fade ${visible ? 'visible' : ''}`}
        >
            <div className="player-container">
                <div className="player-header">
                    <h2 className="section-title">NUESTRA MÚSICA</h2>
                    <p className="section-subtitle">Reproductor Premium Banda 89</p>
                    <div className="gold-divider" style={{ margin: '10px auto 40px' }} />
                </div>

                <div className="player-grid">

                    {/* 📱 PANEL IZQUIERDO: CANCIÓN DESTACADA (CARD) */}
                    <div className="highlighted-card">
                        <div className="album-art-wrapper">
                            <img
                                src={highlightedSong.cover}
                                alt={highlightedSong.titulo}
                                className={`album-art ${isPlaying ? 'revolving' : ''}`}
                            />
                            {isPlaying && <div className="art-glow" />}
                        </div>

                        <div className="player-controls-box">
                            <div className="track-info">
                                <h3 className="track-title">{highlightedSong.titulo}</h3>
                                <p className="track-artist">{highlightedSong.artista}</p>
                                <span className="track-genre">{highlightedSong.genero}</span>
                            </div>

                            <div className="progress-container">
                                <div className="progress-bar-bg">
                                    <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                                </div>
                                <div className="time-info">
                                    <span>0:00</span>
                                    <span>{highlightedSong.duracion}</span>
                                </div>
                            </div>

                            <div className="main-actions">
                                <button
                                    className="control-btn"
                                    onClick={goPrev}
                                    aria-label="Canción anterior"
                                >
                                    <PrevIcon />
                                </button>
                                <button className="play-pause-circle" onClick={togglePlay}>
                                    {isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
                                </button>
                                <button
                                    className="control-btn"
                                    onClick={goNext}
                                    aria-label="Siguiente canción"
                                >
                                    <NextIcon />
                                </button>
                            </div>

                            {/* 📱 BOTONES DE PLATAFORMAS */}
                            <div className="streaming-links-container">
                                <a href={streamingLinks.spotify} target="_blank" rel="noopener noreferrer" className="streaming-link spotify" aria-label="Escuchar en Spotify">
                                    <SpotifyIcon />
                                </a>
                                <a href={streamingLinks.youtube} target="_blank" rel="noopener noreferrer" className="streaming-link youtube" aria-label="Escuchar en YouTube">
                                    <YouTubeIcon />
                                </a>
                                <a href={streamingLinks.apple} target="_blank" rel="noopener noreferrer" className="streaming-link apple" aria-label="Escuchar en Apple Music">
                                    <AppleIcon />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* 📜 PANEL DERECHO: PLAYLIST (FILA) */}
                    <div className="playlist-panel">
                        <div className="playlist-header">
                            <span>LISTA DE REPRODUCCIÓN</span>
                        </div>

                        <div className="playlist-scroll">
                            {playlist.map((song, idx) => (
                                <div
                                    key={song.id}
                                    className={`playlist-item scroll-reveal-lateral reveal-right ${visible ? 'visible' : ''}`}
                                    style={{ transitionDelay: `${(idx + 1) * 0.1}s` }}
                                    onClick={() => handleSwap(song)}
                                >
                                    <div className="item-index">{idx + 1}</div>
                                    <img src={song.cover} alt="" className="item-thumb" />
                                    <div className="item-body">
                                        <div className="item-title">{song.titulo}</div>
                                        <div className="item-artist">{song.artista}</div>
                                    </div>
                                    <div className="item-duration">{song.duracion}</div>
                                    <div className="item-hover-icon"><PlayIcon size={16} /></div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
