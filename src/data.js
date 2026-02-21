/**
 * DATA – Banda 89 El Reencuentro Oficial
 * Centraliza toda la información de la banda.
 */

// Imágenes del carrusel (SVG placeholder con gradiente dorado)
export const carouselSlides = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80',
        caption: 'El Reencuentro 2025',
        sub: 'Noche histórica en el Palenque de Culiacán',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=80',
        caption: 'Tour Nacional',
        sub: 'Recorriendo México pueblo por pueblo',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900&q=80',
        caption: 'El Sonido que Mueve',
        sub: '35 músicos, un solo corazón al ritmo de la banda',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=80',
        caption: 'Fiesta Grande',
        sub: 'Bailes, charros y pura alegría sinaloense',
    },
]

// Canciones (usamos fragmentos de audio de dominio público / demo)
export const canciones = [
    {
        id: 1,
        titulo: 'El Reencuentro',
        artista: 'Banda 89',
        genero: 'Banda Sinaloense',
        duracion: '4:23',
        emoji: '🎺',
        cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
        id: 2,
        titulo: 'Corazón Norteño',
        artista: 'Banda 89',
        genero: 'Regional Mexicano',
        duracion: '3:58',
        emoji: '🎻',
        cover: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
        id: 3,
        titulo: 'La Fiesta de Mi Tierra',
        artista: 'Banda 89',
        genero: 'Banda Sinaloa',
        duracion: '4:10',
        emoji: '🥁',
        cover: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&q=80',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
    {
        id: 4,
        titulo: 'Viva México',
        artista: 'Banda 89',
        genero: 'Regional Mexicano',
        duracion: '3:44',
        emoji: '🎵',
        cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    },
    {
        id: 5,
        titulo: 'Sinaloa Mi Amor',
        artista: 'Banda 89',
        genero: 'Banda Sinaloense',
        duracion: '4:55',
        emoji: '🎶',
        cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
        audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    },
]

// Próximas fechas
export const eventos = [
    {
        id: 1,
        dia: '14',
        mes: 'Mar',
        titulo: 'Palenque Culiacán',
        lugar: 'Culiacán, Sinaloa',
        estado: 'Últimos boletos',
        link: '#',
    },
    {
        id: 2,
        dia: '28',
        mes: 'Mar',
        titulo: 'Feria de Mazatlán',
        lugar: 'Mazatlán, Sinaloa',
        estado: 'Disponibles',
        link: '#',
    },
    {
        id: 3,
        dia: '12',
        mes: 'Abr',
        titulo: 'Plaza de Toros Guadalajara',
        lugar: 'Guadalajara, Jalisco',
        estado: 'Preventa',
        link: '#',
    },
    {
        id: 4,
        dia: '03',
        mes: 'May',
        titulo: 'Foro Reforma CDMX',
        lugar: 'Ciudad de México',
        estado: 'Disponibles',
        link: '#',
    },
]

export const socialLinks = {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
}
