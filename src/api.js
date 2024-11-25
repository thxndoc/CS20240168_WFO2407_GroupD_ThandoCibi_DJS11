// base url
const baseUrl = 'https://podcast-api.netlify.app';

// fetch data for all previews
export async function fetchPreviewsData() {
    const response = await fetch(`${baseUrl}/`)
    if (!response.ok) throw new Error('Failed to fetch preview data')
    return response.json()
}


