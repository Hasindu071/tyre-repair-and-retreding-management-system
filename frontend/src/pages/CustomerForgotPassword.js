import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import '../styles/CustomerForgotPassword.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            toast.error("Email field cannot be empty.");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/CustomerForgotPassword/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: trimmedEmail })
            });
            const data = await response.json();

            if (data.success) {
                // Instead of a toast, show the Bootstrap modal
                setShowModal(true);
            } else {
                toast.error(data.message || 'Failed to send reset link. Please try again.');
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
                    <button type="submit" className="submit-button-customer" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                    <p className="back-to-login-customer" onClick={() => navigate('/customer/login')}>
                        Back to Login
                    </p>
                </form>
            </div>

            {/* Bootstrap Modal */}
            {showModal && (
                <>
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Reset Link Sent</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Please check your email for the reset link.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={() => { setShowModal(false); navigate('/login/customer'); }}>
                                        OK
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </div>
    );
};

export default CustomerForgotPassword;