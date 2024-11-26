import { Link, NavLink } from "react-router-dom"
import appLogoUrl from '/logo.png'

export default function Header() {
    return (
        <header>
            <Link className="app-logo" to="/">
                <img src={appLogoUrl}/>
            </Link> 
        </header>
    )
}