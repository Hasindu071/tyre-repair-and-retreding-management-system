import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar';
import '../styles/WokerSignup.css'; // Import the CSS file for styling

const WorkerRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rePassword: '',
        secretKey: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        navigate('/login/worker'); 
    };

    return (
        <div>
            <Navbar />
            <div className="worker-signup-container">
                <div className="worker-signup-box">
                    <h2 className="worker-signup-title">Worker <span>REGISTRATION</span></h2>
                    <form onSubmit={handleSubmit} className="worker-signup-form">
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <input type="password" name="rePassword" placeholder="Re-enter Password" value={formData.rePassword} onChange={handleChange} required />
                        <input type="text" name="secretKey" placeholder="Secret Key" value={formData.secretKey} onChange={handleChange} required />
                        <button type="submit" className="signup-button-worker">SEND</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerRegister;
