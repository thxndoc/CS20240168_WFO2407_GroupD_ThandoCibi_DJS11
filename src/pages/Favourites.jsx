import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Favourites() {
    const [favourites, setFavourites] = useState([])

    useEffect(()=> {
        const favouritedShows = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(favouritedShows);
    }, [])

    const removeFromFavourites = (showId) => {
        const updatedFavourites = favourites.filter(show => show.id !== showId);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    if (favourites.length === 0) {
        return (
            <div className="favourites-page">
                <h1>No Favourited Shows Yet...</h1>
            </div>
        );
    }

    return (

    )
}