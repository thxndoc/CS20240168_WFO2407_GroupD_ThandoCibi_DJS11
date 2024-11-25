// base url
const baseUrl = 'https://podcast-api.netlify.app';

// fetch data for all previews
export async function fetchPreviewsData() {
    const response = await fetch(`${baseUrl}/`)
    if (!response.ok) throw new Error('Failed to fetch preview data')
    const data = await response.json()
    return data
}


