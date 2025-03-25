import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import '../styles/OwnerForgotPassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OwnerForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            toast.error('Email field cannot be empty.');
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/ownerForgotPassword/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmedEmail })
            });
            const data = await response.json();
            if (data.success) {
                toast.success('Reset link sent! Check your email.');
                setTimeout(() => navigate('/owner/login'), 2500);
            } else {
                toast.error(data.message || 'Failed to send reset link.');
            }
        } catch (error) {
            console.error('Error sending reset link:', error);
            toast.error('An error occurred. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="forgot-password-container">
                <h2 className="title">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <div className="input-group-owner">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-label="Email Address"
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    <p className="back-to-login" onClick={() => navigate('/owner/login')} role="button" tabIndex="0">
                        Back to Login
                    </p>
                </form>
            </div>
        </div>
    );
};

export default OwnerForgotPassword;