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
            <ul>
                {previews.map((preview) => (
                <li key={preview.id}>
                <img src={preview.image} alt={preview.title} />
                <h2>{preview.title}</h2>
                <p>{preview.genres.join(", ")}</p>
                <p>Last updated: {new Date(preview.updated).toLocaleDateString()}</p>
                </li>
                ))}
            </ul>
        </div>
    )
}
