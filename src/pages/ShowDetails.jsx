import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // get dynamic show id
import { fetchShowById } from "../api";

export default function ShowDetails() {
    const { showId } = useParams(); // get the show id from url
    const [showDetails, setShowDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadShowDetails() {
            setLoading(true);
            try {
                const data = await fetchShowById(showId);
                setShowDetails(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        loadShowDetails();
    }, []);
    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <h1 aria-live="assertive">There was an error: {error.message}</h1>
            </div>
        );
    }

    if (!showDetails) {
        return <div>Show not found.</div>;
    }

    return (
        <div className="show-details">
            <h1>{showDetails.title}</h1>
            <div className="show-info">
                <div className="show-info-img-container">
                    <img src={showDetails.image} alt={showDetails.title} />
                </div>
                <p>{showDetails.description}</p>
                {/* add seasons here */}
            </div>
        </div>
    );
}