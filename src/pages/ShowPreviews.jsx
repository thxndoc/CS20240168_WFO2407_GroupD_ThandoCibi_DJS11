import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPreviewsData, fetchAllData, fetchGenreById } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from "@fortawesome/free-regular-svg-icons/faCalendar";

export default function ShowPreviews() {
    const [previews, setPreviews] =useState([])
    const [genres, setGenres] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadPreviews() {
            setLoading(true)
            try {
                const data = await fetchPreviewsData()
                const sortedShowsAscending = data.sort((a, b) => a.title.localeCompare(b.title));
                setPreviews(sortedShowsAscending);
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
        return (
            <div className="error-message">
                <h1 aria-live="assertive">There was an error: {error.message}</h1>
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="title">All shows</h1>

            <div className="previews-grid">
                {previews.map((preview) => (
                    <div key={preview.id} className="card">
                        <div className="card-img-container">
                            <img src={preview.image} alt={preview.title} className="card-img" />
                        </div>

                        <div className="card-content">
                            <h2 className="card-title">{preview.title}</h2>

                            <div className="seasons">
                                {preview.seasons} {preview.seasons === 1 ? 'Season' : 'Seasons'}
                            </div>

                            <div className="last-updated">
                                <FontAwesomeIcon icon={faCalendar} />
                                <p className="date">{new Date(preview.updated).toLocaleDateString()}</p>
                            </div>

                            <div className="genres">
                            {/*will come back to this😭*/}
                            </div>

                            <Link
                            to={`${preview.id}`}
                            className="view-button">
                                View Episodes
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
