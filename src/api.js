// base url
const baseUrl = 'https://podcast-api.netlify.app';

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

export async function fetchPreviewAndGenreData() {
    try {
        
        const previewData = await fetchPreviewsData()

        // collect all unique genre IDs from preview data
        const genreIds = [...new Set(previewData.flatMap(podcast => podcast.genres))]

        // fetch genre data for each genre ID in parallel using map and Promise.all
        const genres = await Promise.all(genreIds.map(genreId => fetchGenreById(genreId)))

        // create an object that maps genre IDs to their titles using reduce
        const genreMapping = genres.reduce((acc, genreData, index) => {
            const genreId = genreIds[index] // corresponding genreId for each genreData
            acc[genreId] = genreData.title
            return acc
        }, {})

        return genreMapping
    } catch (error) {
        console.error('Error fetching preview and genre data:', error)
    }
}