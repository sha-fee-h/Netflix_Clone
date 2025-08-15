import React, { useEffect, useRef } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom'



const Navbar = () => {

    const navRef = useRef();
    const { currentUser, loading } = useAuth();

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY >= 80) {
                navRef.current.classList.add('nav-dark')
            }
            else {
                navRef.current.classList.remove('nav-dark')
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    return (
        <div ref={navRef} className='navbar'>

            <div className="navbar-left">
                <Link to="/">
                    <img src={logo} alt="Netflix Logo" />
                </Link>
                <input type="checkbox" id="navbar-toggle" className="navbar-toggle" />
                <label htmlFor="navbar-toggle" className="navbar-hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <ul>
                    <li>
                        <Link className="links" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="links">TV Shows</Link>
                    </li>
                    <li>New & Popular</li>
                    <li>
                        <Link className="links" to="/favorites">My List</Link>
                    </li>
                    <li><Link className="links" to={'/about-us'}>About Us</Link></li>
                </ul>
            </div>

            <div className='navbar-right'>
                <img src={search_icon} alt="" className='icons' />
                <p>{loading ? 'Loading...' : currentUser?.name || 'Guest'}</p>
                <img src={bell_icon} alt="" className='icons' />

                <div className="navbar-profile">
                    <img src={profile_img} alt="" className='profile' />
                    <img src={caret_icon} alt="" />
                    <div className='dropdown'>
                        <p>Manage Profiles</p>
                        <Link to='/favorites'>
                            <p>Favorites</p>
                        </Link>
                        <p onClick={() => logout()}>Sign Out</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar
