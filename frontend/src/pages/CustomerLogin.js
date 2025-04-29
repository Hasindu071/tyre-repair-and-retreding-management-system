import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/CustomerLogin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext'; // Import auth context

const API_URL = "http://localhost:5000";

const CustomerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login } = useAuth(); // Use auth context
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
    
                login('customer', data.customer.id, data.customer.userName, data.token);
    
                console.log('User logged in:', data.customer.id, data.customer.userName); // Fixed the log statement
    
                setTimeout(() => navigate('/customerDashboard'), 2000);
            } else {
                setErrorMessage('Login failed! Please check your credentials.');
                toast.error('Login failed! Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('An error occurred. Please try again.');
        }
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
                        <p className="customer-forgot-password" onClick={() => navigate('/customer/forgot-password')}>
                            Forgot Password?
                        </p>
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
