import { useState, useEffect } from "react";
import { fetchPreviewsData } from "../api";

export default function ShowPreviews() {
    const [previews, setPreviews] =useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadPreviews() {
            setLoading(true)
            try {
                const data = await fetchPreviewsData()
                setPreviews(data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        loadPreviews();
    },[])

    if (loading) {
        return (
        <div className="loader-container">
            <div className="loader"></div>
        </div>
        )
    }

    if (error) {
        return <h1 aria-live="assertive">There was an error: {error.message}</h1>
    }

    return (
        <div className="container">
            <h1 className="title">All shows</h1>

            <div className="previews-grid">
                {previews.map((preview) => (
                    <div key={preview.id} className="card">
                        <img src={preview.image} alt={preview.title} />

                        <div className="card-content">
                            <h2 className="card-title">{preview.title}</h2>
                        </div>
                        
                        <div className="seasons">
                            {preview.seasons} {preview.seasons === 1 ? 'Season' : 'Seasons'}
                        </div>

                        <div className="last-updated">
                            <p>Last updated: {new Date(preview.updated).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="genres">
                            {preview.genres.map((genre, index) => (
                                <span key={index} className="genre-tag">{genre}</span>
                            ))}
                        </div>

                        <button className="view-button">View Episodes</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
