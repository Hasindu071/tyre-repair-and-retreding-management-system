import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar'; // Assuming you have a Navbar component
import '../styles/OwnerLogin.css'; // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:5000";

const OwnerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [resetMode, setResetMode] = useState(false); // Toggle between login and reset mode
    const [resetEmail, setResetEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleResetChange = (e) => {
        setResetEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/Owner/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Login successful!');
                setTimeout(() => navigate('/OwnerDashboard'), 2000); // 2 seconds
            }
             else {
                setErrorMessage('Login failed! Please check your credentials.');
                toast.error('Login failed! Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('An error occurred. Please try again.');
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset link sent to:", resetEmail);
        toast.success('Password reset link has been sent to your email!');
        setResetMode(false);
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
        // Add Google authentication logic here
    };

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="owner-login-container">
                <div className="owner-login-card">
                    <h2 className="owner-login-title">{resetMode ? "Reset Password" : "Owner Login"}</h2>
                    
                    {resetMode ? (
                        <form onSubmit={handleResetSubmit}>
                            <div className="owner-input-group">
                                <input
                                    type="email"
                                    name="resetEmail"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={handleResetChange}
                                    className="owner-input"
                                    required
                                />
                            </div>
                            <button type="submit" className="owner-login-button">
                                Send Reset Link
                            </button>
                            <p className="back-to-login" onClick={() => setResetMode(false)}>Back to Login</p>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="owner-input-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="owner-input"
                                    required
                                />
                            </div>
                            <div className="owner-input-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="owner-input"
                                    required
                                />
                            </div>
                            <button type="submit" className="owner-login-button">
                                Login
                            </button>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <p className="owner-forgot-password" onClick={() => setResetMode(true)}>Forgot Password?</p>
                        </form>
                    )}

                    <button type="button" className="owner-google-login" onClick={handleGoogleLogin}>
                            Continue with Google
                        </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerLogin;