import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar'; // Assuming you have a Navbar component
import '../styles/CustomerLogin.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:5000";

const CustomerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/Customer/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Login successful!');
                setTimeout(() => navigate('/customerDashboard'), 2000); // 2 seconds
            } else {
                setErrorMessage('Login failed! Please check your credentials.');
                toast.error('Login failed! Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('An error occurred. Please try again.');
        }
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
                            <label htmlFor="email">Email:</label>
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
                            <label htmlFor="password">Password:</label>
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
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <a href="/forgot-password" className="worker-forgot-password">Forgot Password?</a>
                        <button type="button" className="customer-google-login" onClick={handleGoogleLogin}>
                            Continue with Google
                        </button>
                        <p className="customer-signup-tage" onClick={() => navigate('/register/customer')}>
                         Don't have an account? Sign Up
                        </p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CustomerLogin;