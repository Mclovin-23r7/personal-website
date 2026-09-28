import './header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <h1><Link to="/">Mclovin</Link></h1>
            <nav>
                <ul>
                    <li className="nav-dropdown"><Link to="#">Projects</Link>
                        <ul>
                            <li><Link to="/yaisst">Yet Another ISS Tracker</Link></li>
                            <li><Link to="#">Interactive Biblical Map</Link></li>
                        </ul>
                    </li>
                    <li><Link to="#">Dumb Monkey Thoughts</Link></li>
                    <li><Link to="#">Guestbook</Link></li>
                    <li><Link to="#">Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}