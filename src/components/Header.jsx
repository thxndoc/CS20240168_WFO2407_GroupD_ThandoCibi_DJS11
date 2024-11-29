import { Link } from "react-router-dom"
import appLogoUrl from '/logo.png'
import FavouritesDotBadge from "./FavouritesDotBadge"

export default function Header() {
    return (
        <header>
            <Link className="app-logo" to="/">
                <img src={appLogoUrl}/>
            </Link> 
            <Link className="heart-icon-link" to="/favourites">
                <FavouritesDotBadge />
            </Link>
        </header>
    )
}