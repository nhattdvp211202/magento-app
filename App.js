import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './magento/Header';
import Footer from './magento/Footer';
import Login from './magento/Login';
import ProductList from './magento/ProductList';
import TestimonialList from './magento/TestimonialList';
import Cart from './magento/Cart';
import Index from './magento/Index';
import axios from 'axios';
import './App.css';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            fetchCartCount();
        }
    }, [token]);

    const fetchCartCount = async () => {
        try {
            const response = await axios.get('http://localhost.magento.com/rest/V1/carts/mine/items', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const count = response.data.reduce((total, item) => total + item.qty, 0);
            setCartCount(count);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const handleLoginSuccess = (name) => {
        setIsLoggedIn(true);
        setUsername(name);
        localStorage.setItem('username', name);
        fetchCartCount();
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setCartCount(0);
    };

    const deleteCartItem = async (itemId) => {
        try {
            await axios.delete(`http://localhost.magento.com/rest/V1/carts/mine/items/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchCartCount();
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    return (
        <Router>
            <div className="app-container">
                <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} cartCount={cartCount} />
                <main className="main-content">
                    <Routes>
                    <Route path="/" element={<Index />} />
                        <Route 
                            path="/login" 
                            element={<Login setToken={setToken} onLoginSuccess={handleLoginSuccess} />} 
                        />
                        <Route path="/products" element={<ProductList token={token} updateCartCount={setCartCount} />} />
                        <Route path="/testimonials" element={<TestimonialList token={token} />} />
                        <Route path="/cart" element={<Cart token={token} deleteCartItem={deleteCartItem} />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
