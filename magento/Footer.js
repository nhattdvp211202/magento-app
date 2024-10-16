import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="">Privacy and Cookie Policy</a>
                <a href="">Search Terms</a>
                <a href="">Advanced Search</a>
                <a href="">Contact Us</a>
            </div>
            <div className="newsletter">
                <input type="email" placeholder="Enter your email address" aria-label="Email address" />
                <button className="subscribe-button">Subscribe</button>
            </div>
        </footer>
    );
};

export default Footer;
