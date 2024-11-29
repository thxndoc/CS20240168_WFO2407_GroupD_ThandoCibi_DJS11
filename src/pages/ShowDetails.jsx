import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    const [favourites, setFavourites] = useState([])

    // load favourites from local storage
    useEffect(() => {
        const savedFavourites = JSON.parse(localStorage.getItem("favourites") || "[]");
        setFavourites(savedFavourites);
      }, []);
    
      // save favourites to localStorage whenever they change
      useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
      }, [favourites]);

    useEffect(() => {
        async function loadShowDetails() {
            setLoading(true);
            try {
                const data = await fetchShowById(showId)
                setShowDetails(data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        loadShowDetails();
    }, []);

    const handleToggleFavourite = (episode, show, season) => {
        setFavourites((prevFavourites) => {
            const isAlreadyFavourite = prevFavourites.some(
              (fav) =>
                fav.episode.episode === episode.episode &&
                fav.show === show &&
                fav.season === season
            );
      
            if (isAlreadyFavourite) {
              // remove from favourites
              return prevFavourites.filter(
                (fav) =>
                  !(fav.episode.episode === episode.episode &&
                    fav.show === show &&
                    fav.season === season)
              );
            } else {
              // add to favourites
              return [...prevFavourites, { episode, show, season, dateAndTimeAdded: new Date().toISOString() }];
            }
          })
    }

    const isFavourite = (episode, show, season) => {
        return favourites.some(
          (fav) =>
            fav.episode.episode === episode.episode &&
            fav.show === show &&
            fav.season === season
        )
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
            <div className="back-button-container">
                <Link
                to="/"
                relative="path"
                className="back-button"
                >Back to all shows
                </Link>
            </div>
            
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
                                            <div>
                                                <h3>{`Episode: ${episode.episode}`}</h3>

                                                {/* favourites(heart) button */}
                                                <div className="favourite-icon">
                                                <FontAwesomeIcon
                                                icon={
                                                    isFavourite(episode, showDetails.title, season.season)
                                                        ? solidHeart 
                                                        : regularHeart
                                                }
                                                onClick={() => handleToggleFavourite(episode, showDetails.title, season.season)}
                                                className="favourite-icon-link"
                                                />
                                                </div>
                                            </div>
                                            <h3>{episode.title}</h3>
                                            <p>{episode.description}</p>

                                            <div className="audio-container">
                                                {/* audio player */}
                                                <audio controls>
                                                    <source src={episode.file} type="audio/mpeg"  onError={(error) => {
                                                    console.error('Audio error:', error)
                                                    }}/>
                                                    Your browser does not support the audio element.
                                                </audio>
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