import { useState, useRef, useEffect, useCallback } from 'react'
import { useFadeIn } from '../hooks'
import { canciones } from '../data'

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
                        </div>
                    </div>

                    {/* 📜 PANEL DERECHO: PLAYLIST (FILA) */}
                    <div className="playlist-panel">
                        <div className="playlist-header">
                            <span>LISTA DE REPRODUCCIÓN</span>
                            <span>{playlist.length + 1} CANCIONES</span>
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
