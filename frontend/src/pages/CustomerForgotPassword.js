import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import '../styles/CustomerForgotPassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            toast.error("Email field cannot be empty.");
            return;
        }
        try {
            const response = await fetch('http://localhost:5000/CustomerForgotPassword/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmedEmail })
            });
            const data = await response.json();

            if (data.success) {
                toast.success('Reset link sent to your email!');
                setTimeout(() => navigate('/login/customer'), 2000);
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
            <div className="forgot-password-container-customer">
                <h2 className="title-customer">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="forgot-password-form-customer">
                    <div className="input-group-customer">
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
                    <button type="submit" className="submit-button-customer">Send Reset Link</button>
                    <p className="back-to-login-customer" onClick={() => navigate('/customer/login')}>
                        Back to Login
                    </p>
                </form>
            </div>
        </div>
    );
};

export default CustomerForgotPassword;