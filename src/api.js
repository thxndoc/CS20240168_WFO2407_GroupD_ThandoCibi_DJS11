// base url
const baseUrl = 'https://podcast-api.netlify.pp';

// fetch data for all previews
export async function fetchPreviewsData() {
    const response = await fetch(`${baseUrl}/`)
    if (!response.ok) throw new Error('Failed to fetch preview data')
    const data = await response.json()
    return data
}

// fetch genre by Id
export async function fetchGenreById(genreId) {
    if (!genreId) throw new Error('Genre ID is required')
    const response = await fetch(`${baseUrl}/genre/${genreId}`)
    if (!response.ok) throw new Error('Failed to fetch genre data')
    const data = await response.json()
    return data
}

// fetch specific show by Id
export async function fetchShowById(showId) {
    if (!showId) throw new Error('Show ID is required')
    const response = await fetch(`${baseUrl}/id/${showId}`)
    if (!response.ok) throw new Error('Failed to fetch show data')
    const data = await response.json()
    return data
}