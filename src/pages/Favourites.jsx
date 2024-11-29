import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Favourites() {
  const [favourites, setFavourites] = useState(() => {
    // Read from localStorage on initial render
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  // Update localStorage whenever the favourites state changes
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Remove a favourite episode
  const removeFavourite = (episodeId) => {
    const updatedFavourites = favourites.filter(
      (fav) => `${fav.episode.episode} ${fav.show} ${fav.season}` !== episodeId
    );
    setFavourites(updatedFavourites);
  };

  if (favourites.length === 0) {
    return (
      <div className="empty-favourites">
        <h2>No favourites saved yet!</h2>
      </div>
    );
  }

  return (
    <div className="favourites-page">
      <h1>Your Favourite Episodes</h1>
      <div className="favourites-list">
        {favourites.map((fav) => (
          <div key={`${fav.episode.episode} ${fav.show} ${fav.season}`} className="favourite-item">
            {/* Episode Image */}
            <img src={fav.episode.image} alt={fav.episode.title} className="episode-image" />

            {/* Episode Info */}
            <div className="episode-info">
              <h3>{fav.episode.title}</h3>
              <p>Show: {fav.show}</p>
              <p>Season: {fav.season}, Episode: {fav.episode.episode}</p>
              <p>Date Added: {new Date(fav.dateAndTimeAdded).toLocaleString()}</p>

              {/* Audio Player */}
              <audio controls>
                <source src={fav.episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>

            {/* Remove Button */}
            <FontAwesomeIcon
              icon={faTrash}
              className="remove-icon"
              onClick={() =>
                removeFavourite(`${fav.episode.episode} ${fav.show} ${fav.season}`)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
