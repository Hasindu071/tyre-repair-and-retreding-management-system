import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import '../styles/OwnerForgotPassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OwnerForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/owner/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();

            if (data.success) {
                toast.success('Reset link sent to your email!');
                setTimeout(() => navigate('/owner/login'), 2000);
            } else {
                toast.error(data.message || 'Failed to send reset link. Please try again.');
            }
        } catch (error) {
            console.error('Error sending reset link:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="forgot-password-container">
                <h2 className="title">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="forgot-password-form">
                    <div className="input-group">
                        <label htmlFor="email">Email Address:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Send Reset Link</button>
                    <p className="back-to-login" onClick={() => navigate('/owner/login')}>Back to Login</p>
                </form>
            </div>
        </div>
    );
};

export default OwnerForgotPassword;