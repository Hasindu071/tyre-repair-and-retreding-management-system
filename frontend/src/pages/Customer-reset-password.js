import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CustomerResetPassword.css';

const CustomerResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get the token from the URL query parameters
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or missing token.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Invalid or missing token.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/CustomerForgotPassword/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword })
            });
            const data = await response.json();

            if (data.success) {
                toast.success('Password reset successful!');
                setTimeout(() => navigate('/login/customer'), 2500);
            } else {
                toast.error(data.message || 'Failed to reset password.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            toast.error('An error occurred. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="reset-password-container">
            <ToastContainer />
            <h2 className="title">Reset Password</h2>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div className="input-group-customer">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group-customer">
                    <label htmlFor="confirmPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
            </form>
        </div>
    );
};

export default CustomerResetPassword;