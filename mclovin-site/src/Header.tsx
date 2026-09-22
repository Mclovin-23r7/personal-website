import './header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header>
            <ul>
                <li><Link to="#">Home</Link></li>
                <li><Link to="#">Projects</Link>
                    <ul className="dropdown">
                        <li><Link to="#">Interactive Biblical Map</Link></li>
                        <li><Link to="/yaisst">Yet Another ISS Tracker</Link></li>
                    </ul>
                </li>
                <li><Link to="#">Dumb Monkey Thoughts</Link></li>
                <li><Link to="#">Guestbook</Link></li>
                <li><Link to="#">Contact</Link></li>
            </ul>
        </header>
    )
}