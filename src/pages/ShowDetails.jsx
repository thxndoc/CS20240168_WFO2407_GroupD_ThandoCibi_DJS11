import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // get dynamic show id
import { fetchShowById } from "../api";
import Accordion from "../components/Accordion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

export default function ShowDetails() {
    const { showId } = useParams() // get the show id from url
    const [showDetails, setShowDetails] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isFavourite, setIsFavourite] = useState(false)

    useEffect(() => {
        async function loadShowDetails() {
            setLoading(true);
            try {
                const data = await fetchShowById(showId)
                setShowDetails(data)

                const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
                setIsFavourite(favourites.some(fav => fav.id === data.id))
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        loadShowDetails();
    }, []);

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite)

        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

        if (!isFavourite) {
            favourites.push(showDetails)
        } else {
            favourites = favourites.filter(fav => fav.id !== showDetails.id)
        }

        localStorage.setItem('favourites', JSON.stringify(favourites))
    }

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
                <h2 className="seasons-heading">Seasons</h2>

                <div className="seasons">
                    {showDetails.seasons.map((season) => (
                        <Accordion
                            key={season.season}
                            title={`Season: ${season.season}`}
                            episodesInSeason={`Episodes in season: ${season.episodes.length}`}
                            content={(
                            <div>
                                <img src={season.image} alt={season.title} />
                    
                                 {/* episodes for the season */}
                                 <div className="episodes">
                                    {season.episodes.map((episode) => (
                                        <div key={episode.episode} className="episode">
                                            <h3>{`Episode: ${episode.episode}`}</h3>
                                            <h3>{episode.title}</h3>
                                            <p>{episode.description}</p>
                    
                                            {/* audio player */}
                                            <audio controls>
                                                <source src={episode.file} type="audio/mpeg"  onError={(error) => {
                                                console.error('Audio error:', error);
                                                }}/>
                                                Your browser does not support the audio element.
                                            </audio>

                                            {/* favourites(heart) button */}
                                             <div className="favourite-icon">
                                                    <FontAwesomeIcon
                                                        icon={isFavourite ? solidHeart : regularHeart}
                                                        onClick={toggleFavourite}
                                                        className="heart-icon-link"
                                                    />
                                                </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    />
                    ))}
                </div>
            </div>
        </div>
    )
}