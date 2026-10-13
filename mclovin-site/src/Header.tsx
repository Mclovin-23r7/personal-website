import './header.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
    // Mobile functions
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
        if (projectsOpen) {setProjectsOpen(false)}
    };

    const [projectsOpen, setProjectsOpen] = useState(false);
    const toggleProjectsMenu = () => {
        setProjectsOpen(!projectsOpen)
    }

    const closeMenus = () => {
        setProjectsOpen(false)
        setMobileMenuOpen(false)
    }

    return (
        <>
        <header>
            <h1><Link to="/" onClick={closeMenus}>Mclovin</Link></h1>
            <img src='./src/assets/temp-header-image.jpg' />

            <div className='menu-button' onClick={toggleMobileMenu}>
                <div className={mobileMenuOpen ? 'burger burger1' : 'burger'} />
                <div className='burger-centre'>
                    <div className={mobileMenuOpen ? 'burger burger-centre-1' : 'burger'} />
                    <div className={mobileMenuOpen ? 'burger burger-centre-2' : 'burger'} />
                </div>
                <div className={mobileMenuOpen ? 'burger burger3' : 'burger'} />
            </div>

            <div className={mobileMenuOpen ? 'nav-clip nav-open desktop-nav' : 'nav-clip desktop-nav'}>
                <nav>
                    <ul>
                        <li><a onClick={toggleProjectsMenu}>Projects</a>
                            <div className={projectsOpen ? 'sub-clip sub-open' : 'sub-clip'}>
                                <ul className='nav-dropdown'>
                                    <li><Link to="/yaisst" onClick={closeMenus}>Yet Another ISS Tracker</Link></li>
                                    <li><Link to="#" onClick={closeMenus}>Interactive Biblical Map</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li><Link to="#" onClick={closeMenus}>Monkey Thoughts</Link></li>
                        <li><Link to="#" onClick={closeMenus}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
    )
}