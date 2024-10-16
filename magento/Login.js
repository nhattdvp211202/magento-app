import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setToken, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost.magento.com/rest/V1/integration/customer/token', {
                username: email,
                password
            });
            const token = response.data;
            setToken(token);
            onLoginSuccess(email.split('@')[0]);
            navigate('/products');
        } catch (error) {
            console.error('Error logging in', error);
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Sign In</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Username <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        placeholder="Enter your password"
                    />
                    <div className="show-password">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <label>Show Password</label>
                    </div>
                </div>
                <button type="submit" className="login-button">Sign In</button>
                {error && <p className="error-message">{error}</p>}
                <p className="forgot-password"><a href="#">Forgot Your Password?</a></p>
            </form>
        </div>
    );
};

export default Login;
