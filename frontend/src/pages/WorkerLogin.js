import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/WorkerLogin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:5000";

const WorkerLogin = () => {
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
        console.log("FormData being sent:", formData); // Debugging line

        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/Worker/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Login successful!');
                setTimeout(() => navigate('/WorkerDashboard'), 2000); // 2 seconds
            } else {
                setErrorMessage(data.message || 'Login failed! Please check your credentials.');
                toast.error(data.message || 'Login failed! Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('An error occurred. Please try again.');
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/Worker/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: resetEmail })
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Password reset link has been sent to your email!');
                setResetMode(false);
            } else {
                setErrorMessage('Failed to send reset link. Please try again.');
                toast.error('Failed to send reset link. Please try again.');
            }
        } catch (error) {
            console.error('Error sending reset link:', error);
            setErrorMessage('An error occurred. Please try again.');
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google login clicked");
        // Add Google authentication logic here
    };

    return (
        <div>
            <Navbar />
            <div className="worker-login-container">
                <div className="worker-login-card">
                    <h2 className="worker-login-title">Worker Login</h2>
                    {resetMode ? (
                        <form onSubmit={handleResetSubmit}>
                            <div className="worker-input-group">
                                <input
                                    type="email"
                                    name="resetEmail"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={handleResetChange}
                                    className="worker-input"
                                    required
                                />
                            </div>
                            <button type="submit" className="worker-login-button">Send Reset Link</button>
                            <button type="button" className="worker-login-button" onClick={() => setResetMode(false)}>Back to Login</button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div className="worker-input-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="worker-input"
                                    required
                                />
                            </div>
                            <div className="worker-input-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="worker-input"
                                    required
                                />
                            </div>
                            <button type="submit" className="worker-login-button">Login</button>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </form>
                    )}
                    <div className="worker-login-options">
                        <p className="worker-forgot-password" onClick={() => setResetMode(true)}>Forgot Password?</p>
                        <button className="worker-google-login" onClick={handleGoogleLogin}>Continue with Google</button>
                        <p className="worker-signup-tage" onClick={() => navigate('/register/worker')}>
                         Don't have an account? Sign Up
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default WorkerLogin;