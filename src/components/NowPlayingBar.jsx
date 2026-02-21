import { PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons'
import { useState, useEffect } from 'react'

/**
 * Barra flotante "Now Playing" que aparece sobre el footer
 * cuando hay una canción reproduciéndose.
 */
export default function NowPlayingBar({ cancion, isPlaying, onToggle }) {
    const [progressPct, setProgressPct] = useState(0)
    const visible = !!cancion

    // Recibe progreso desde MusicSection (prop)
    useEffect(() => {
        if (!cancion) setProgressPct(0)
    }, [cancion])

    if (!cancion) return null

    return (
        <div
            id="now-playing-bar"
            className={`now-playing-bar ${visible ? 'visible' : ''}`}
            role="status"
            aria-live="polite"
            aria-label={`Reproduciendo: ${cancion?.titulo}`}
        >
            {/* Thumbnail emoji */}
            <div className="np-thumb" aria-hidden="true">
                <span style={{ fontSize: '1.1rem' }}>{cancion.emoji}</span>
            </div>

            {/* Info + progress */}
            <div className="np-info">
                <div className="np-title">{cancion.titulo}</div>
                <div className="np-progress">
                    <div className="np-progress-fill" />
                </div>
            </div>

            {/* Controles */}
            <button
                id="np-play-btn"
                className="np-play-btn"
                onClick={onToggle}
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            >
                {isPlaying
                    ? <PauseCircleFilled style={{ fontSize: 22, color: '#0f0600' }} />
                    : <PlayCircleFilled style={{ fontSize: 22, color: '#0f0600' }} />
                }
            </button>
        </div>
    )
}
