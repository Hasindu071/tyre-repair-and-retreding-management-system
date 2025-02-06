import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Assuming you have a Navbar component
import '../styles/OwnerLogin.css'; // Import the CSS file

const OwnerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        secretKey: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Owner Login Data:', formData);
        // Add authentication logic here
        navigate('/dashboard'); // Redirect after successful login (adjust the route accordingly)
    };

    return (
        <div>
            <Navbar />
            <div className="owner-login-container">
                <div className="owner-login-card">
                    <h2 className="owner-login-title">Owner Login</h2>
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
                        <div className="owner-input-group">
                            <input
                                type="text"
                                name="secretKey"
                                placeholder="Secret Key"
                                value={formData.secretKey}
                                onChange={handleChange}
                                className="owner-input"
                                required
                            />
                        </div>
                        <button type="submit" className="owner-login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OwnerLogin;
