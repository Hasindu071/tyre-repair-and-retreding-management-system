import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/WorkerLogin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'; // Use the named export jwtDecode
import { loginWorker, fetchWorkerProfile, resetWorkerPassword } from "../services/authService";

const WorkerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [resetMode, setResetMode] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleResetChange = (e) => {
        setResetEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        console.log("FormData being sent:", formData);
        e.preventDefault();
        try {
            const data = await loginWorker(formData);
            if (data.success) {
                toast.success('Login successful!');
                // Store the token locally for future requests
                localStorage.setItem('token', data.token);
                // Decode token to extract the worker ID
                const decoded = jwtDecode(data.token);
                localStorage.setItem('workerId', decoded.workerId);
                // Fetch worker details to check status
                const workerData = await fetchWorkerProfile(decoded.workerId);
                if (workerData.status === "Approved") {
                    setTimeout(() => navigate('/WorkerDashboard'), 2000);
                } else if (workerData.status === "Pending") {
                    toast.info("Wait a minute, Owner Approve");
                } else if (workerData.status === "Rejected") {
                    toast.error("You are rejected person");
                }
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
            const data = await resetWorkerPassword(resetEmail);
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
                            <button
                                type="button"
                                className="worker-login-button"
                                onClick={() => setResetMode(false)}
                            >
                                Back to Login
                            </button>
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
                        <p className="worker-forgot-password" onClick={() => navigate('/worker/forgot-password')}>
                            Forgot Password?
                        </p>
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