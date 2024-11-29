import { Link } from "react-router-dom"
import appLogoUrl from '/logo.png'
import FavouritesDotBadge from "./FavouritesDotBadge"

export default function Header() {
    return (
        <header>
            <div className="logo-container">
                <Link className="app-logo" to="/">
                    <img src={appLogoUrl}/>
                </Link> 
                <h1>Audio Hive</h1>
            </div>
            
            <Link className="heart-icon-link" to="/favourites">
                <FavouritesDotBadge />
            </Link>
        </header>
    )
}