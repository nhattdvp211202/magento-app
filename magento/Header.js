import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './image/logo.png';
import cartIcon from './image/cart.png';
import './Header.css';

const Header = ({ isLoggedIn, username, onLogout, cartCount }) => {
    const navigate = useNavigate();

    const handleCartClick = () => {
        if (!isLoggedIn) {
            const confirmLogin = window.confirm("Please Login !");
            if (confirmLogin) {
                navigate('/login');
            }
        } else {
            navigate('/cart');
        }
    };

    const handleLogout = () => {
         onLogout();
        navigate('/products');
    };

    return (
        <header>
            <div className="header-top">
                <img src={logo} alt="Tigren Logo" />
                <div className='sign-search'>
                    <div className='sign'>
                        {isLoggedIn ? (
                            <>
                                <span>Hello, {username}</span>
                                <button className='logout-button' onClick={handleLogout}>Log out</button>
                            </>
                        ) : (
                            <>
                                <button className='signin-button' onClick={() => navigate('/login')}>Sign in</button>
                                <button className='signup-button'>Sign up</button>
                            </>
                        )}
                    </div>
                    <div className="search-cart">
                        <div className="search-bar">
                            <input type="text" placeholder="Search entire store here..." />
                            <button className='search-button'>Search</button>
                            <button className="cart-button" onClick={handleCartClick}>
                                <img src={cartIcon} alt="Cart" className="cart-icon" />
                                {cartCount > 0 && <span className="cart-count">{cartCount}</span>} 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    {isLoggedIn && <li><Link to="/testimonials">Testimonials</Link></li>}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
