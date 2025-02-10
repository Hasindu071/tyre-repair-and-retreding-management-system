import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar';
import '../styles/WorkerLogin.css';

const WorkerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        navigate('/WorkerDashboard');
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
                        <button type="submit" className="worker-login-button">Login</button>
                    </form>
                    <div className="worker-login-options">
                        <a href="/forgot-password" className="worker-forgot-password">Forgot Password?</a>
                        <button className="worker-google-login">Continue with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerLogin;