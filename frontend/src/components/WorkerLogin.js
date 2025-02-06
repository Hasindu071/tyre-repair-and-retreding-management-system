import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Assuming you have a Navbar component
import '../styles/WorkerLogin.css'; // Import the CSS file

const WorkerLogin = () => {
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
        console.log('Login Data:', formData);
        // Add login authentication logic here
        navigate('/dashboard'); // Redirect after successful login (adjust route accordingly)
    };

    return (
        <div>
            <Navbar />
            <div className="worker-login-container">
                <div className="worker-login-card">
                    <h2 className="worker-login-title">Worker Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="worker-input-group">
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
                        <div className="worker-input-group">
                            <input
                                type="text"
                                name="secretKey"
                                placeholder="Secret Key"
                                value={formData.secretKey}
                                onChange={handleChange}
                                className="worker-input"
                                required
                            />
                        </div>
                        <button type="submit" className="worker-login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerLogin;
