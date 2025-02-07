import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Assuming you have a Navbar component
import '../styles/CustomerLogin.css'; // Import the CSS file

const CustomerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Customer Login Data:', formData);
        // Add authentication logic here
        navigate('/CustomerDashboard'); // Redirect after successful login (adjust the route accordingly)
    };

    const handleGoogleLogin = () => {
        console.log("Continue with Google clicked");
        // Add Google authentication logic here
    };

    return (
        <div>
            <Navbar />
            <div className="customer-login-container">
                <div className="customer-login-card">
                    <h2 className="customer-login-title">Customer Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="customer-input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="customer-input"
                                required
                            />
                        </div>
                        <div className="customer-input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="customer-input"
                                required
                            />
                        </div>
                        <button type="submit" className="customer-login-button">
                            Login
                        </button>
                        <a href="/forgot-password" className="worker-forgot-password">Forgot Password?</a>
                        <button type="button" className="customer-google-login" onClick={handleGoogleLogin}>
                            Continue with Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
