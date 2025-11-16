import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { auth, signOut } from '../Firebase/Firebase';
import { toast } from 'react-toastify';

import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search1.svg';
import arrowDown from '../../assets/arrow-down.svg';
import heartIcon from '../../assets/heart.avif';
import add from '../../assets/addButton.png';

import SellModal from '../SellModal/SellModal';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [showSellModal, setShowSellModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSellClick = () => {
        if (!user) {
            toast.warn('Please log in to post an ad.');
            return;
        }
        setShowSellModal(true);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <>
            <nav className={`navbar ${menuOpen ? 'active' : ''}`}>

                <div className="navbar__left">
                    <a href="/">
                        <img src={logo} alt="OLX Logo" className="navbar__logo" />
                    </a>
                    <div className="navbar__location">
                        <img src={searchIcon} alt="Search Icon" className="navbar__search-icon" />
                        <span>India</span>
                        <img src={arrowDown} alt="Dropdown Arrow" className="navbar__arrow" />
                    </div>
                </div>


                <button
                    className="navbar__toggle"
                    aria-label="Toggle menu"
                    onClick={toggleMenu}
                >
                    <span className="navbar__toggle-bar"></span>
                    <span className="navbar__toggle-bar"></span>
                    <span className="navbar__toggle-bar"></span>
                </button>


                <div className="navbar__search">
                    <input
                        type="text"
                        placeholder='Search "Mobiles"'
                        className="navbar__search-input"
                    />
                    <button className="navbar__search-button">
                        <img src={searchIcon} alt="Search" />
                    </button>
                </div>

                <div className="navbar__right">
                    <div className="navbar__language">
                        <span>ENGLISH</span>
                        <img src={arrowDown} alt="Dropdown Arrow" className="navbar__arrow" />
                    </div>
                    <button className="navbar__icon-button" aria-label="Wishlist">
                        <img src={heartIcon} alt="Wishlist" />
                    </button>
                    {user ? (
                        <div className="navbar__user-dropdown">
                            <span className="navbar__username">
                                {user.displayName || user.email}
                            </span>
                            <div className="navbar__dropdown-menu">
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    ) : (
                        <a href="/login" className="navbar__login">
                            Login
                        </a>
                    )}

                    {showSellModal && <SellModal onClose={() => setShowSellModal(false)} />}

                    <img
                        src={add}
                        alt="Sell"
                        className="navbar__add-button"
                        onClick={handleSellClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            </nav>


            {showSellModal && <SellModal onClose={() => setShowSellModal(false)} />}
        </>
    );
};

export default Navbar;
