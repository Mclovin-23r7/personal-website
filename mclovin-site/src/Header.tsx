import './header.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
    // Mobile functions
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
    const toggleMenuDropdown = () => {
        setMenuDropdownOpen(!menuDropdownOpen)
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
        setMenuDropdownOpen(false)
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    // Desktop functions


    return (
        <>
        <header>
            <h1><Link to="/" onClick={closeMobileMenu}>Mclovin</Link></h1>

            <div className='menu-button' onClick={toggleMobileMenu}>
                <div className='burger burger1' />
                <div className='burger burger2' />
                <div className='burger burger3' />
            </div>

            <nav className={mobileMenuOpen ? 'mobile-nav' : 'mobile-nav nav-hidden'}>
                <ul>
                    <li className="nav-dropdown"><a onClick={toggleMenuDropdown}>Projects</a>
                        <ul className={menuDropdownOpen ? 'menu-dropdown menu-show' : 'menu-dropdown menu-hidden'}>
                            <li><Link to="/yaisst" onClick={closeMobileMenu}>Yet Another ISS Tracker</Link></li>
                            <li><Link to="#" onClick={closeMobileMenu}>Interactive Biblical Map</Link></li>
                        </ul>
                    </li>
                    <li><Link to="#" onClick={closeMobileMenu}>Monkey Thoughts</Link></li>
                    <li><Link to="#" onClick={closeMobileMenu}>Guestbook</Link></li>
                    <li><Link to="#" onClick={closeMobileMenu}>Contact</Link></li>
                </ul>
            </nav>

            {/* Desktop navigation - there's definitely a better way to do this */}
            <nav className='desktop-nav'>
                <ul>
                    <li className='nav-dropdown'><a >Projects</a>
                        <ul className=''>
                            <li><Link to="/yaisst" >Yet Another ISS Tracker</Link></li>
                            <li><Link to="#" >Interactive Biblical Map</Link></li>
                        </ul>
                    </li>
                    <li><Link to="#" onClick={closeMobileMenu}>Monkey Thoughts</Link></li>
                    <li><Link to="#" onClick={closeMobileMenu}>Guestbook</Link></li>
                    <li><Link to="#" onClick={closeMobileMenu}>Contact</Link></li>
                </ul>
            </nav>
        </header>

        <style>{`
            .burger1 {
                transform: ${mobileMenuOpen ? 'rotate(45deg)' : 'rotate(0)'};
            }
            .burger2 {
                opacity: ${mobileMenuOpen ? 0 : 1};
            }
            .burger3 {
                transform: ${ mobileMenuOpen ? 'rotate(-45deg)' : 'rotate(0)'};
            }
        `}</style>
        </>
    )
}