import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import SortButton from "../components/SortButton";

export default function Favourites() {
  const [favourites, setFavourites] = useState(() => {
    // read from localStorage on initial render
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });
  const [sortedFavourites, setSortedFavourites] = useState(favourites)

  // update localStorage whenever the favourites state changes
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

  const handleSorting = (option) => {
    let sorted = [...favourites];

    if (option === "A-Z") {
      sorted.sort((a, b) => a.episode.title.localeCompare(b.episode.title));
    } else if (option === "Z-A") {
      sorted.sort((a, b) => b.episode.title.localeCompare(a.episode.title));
    } else if (option === "recentlyAdded") {
      sorted.sort((a, b) => new Date(b.dateAndTimeAdded) - new Date(a.dateAndTimeAdded));
    } else if (option === "leastRecentlyAdded") {
      sorted.sort((a, b) => new Date(a.dateAndTimeAdded) - new Date(b.dateAndTimeAdded));
    }

    setSortedFavourites(sorted); // Update the sorted list
  };

  if (favourites.length === 0) {
    return (
      <div className="empty-favourites">
        <Link
        to="/"
        relative="path"
        className="favs-back-button"
        >Back to all shows
        </Link>
        <h2>No saved favourites yet...</h2>
      </div>
    );
  }

  return (
    <div className="favourites-page">
        <Link
        to="/"
        relative="path"
        className="favs-back-button"
        >Back to all shows
        </Link>

        <SortButton onSort={handleSorting} />
       
        <h1>Your Saved Episodes</h1>
        <div className="favourites-list">
        {sortedFavourites.map((fav) => (
          <div key={`${fav.episode.episode} ${fav.show} ${fav.season}`} className="favourite-item">
            {/* episode image */}
            <img src={fav.image} alt={fav.episode.title} className="episode-image" />

            {/* episode info */}
            <div className="episode-info">
              <h3>{fav.episode.title}</h3>
              <p>Show: {fav.show}</p>
              <p>Season: {fav.season}, Episode: {fav.episode.episode}</p>
              <p>Added to favourites: {new Date(fav.dateAndTimeAdded).toLocaleString()}</p>
                <div>
                    {/* audio player */}
                    <audio controls>
                        <source src={fav.episode.file} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    
                    {/* remove button */}
                    <FontAwesomeIcon
                    icon={faTrash}
                    className="remove-icon"
                    onClick={() =>
                        removeFavourite(`${fav.episode.episode} ${fav.show} ${fav.season}`)
                    }
                    />
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
