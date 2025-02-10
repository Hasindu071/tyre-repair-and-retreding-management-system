import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Assuming you have a Navbar component
import '../styles/OwnerLogin.css'; // Import the CSS file

const OwnerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [resetMode, setResetMode] = useState(false); // Toggle between login and reset mode
    const [resetEmail, setResetEmail] = useState("");

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Owner Login Data:', formData);
        // Add authentication logic here
        navigate('/OwnerDashboard'); // Redirect after successful login
    };

    const handleResetSubmit = (e) => {
        e.preventDefault();
        console.log("Password reset link sent to:", resetEmail);
        alert("Password reset link has been sent to your email!");
        setResetMode(false);
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
        // Add Google authentication logic here
    };

    return (
        <div>
            <Navbar />
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
                            <p className="forgot-password" onClick={() => setResetMode(true)}>Forgot Password?</p>
                        </form>
                    )}

                    <div className="or-divider">OR</div>

                    <button className="google-login-button" onClick={handleGoogleLogin}>
                        <img src="../assets/google-icon.png" alt="Google Icon" className="google-icon" />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerLogin;
