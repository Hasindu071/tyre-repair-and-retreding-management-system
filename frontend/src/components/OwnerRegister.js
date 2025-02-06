import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // You can still use Bootstrap for grid layout, if needed.
import Navbar from './NavBar';  // Assuming you have a NavBar component
import '../styles/OwnerRegister.css'; // Assuming you have a CSS file for styling

const OwnerRegister = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
        if (formData.password !== formData.rePassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log('Form submitted:', formData);
    };

    return (
        <div>
            {/* Include Navbar */}
            <Navbar />

            <div className="custom-container">
                <div className="custom-card">
                    <h2 className="custom-title">Owner Sign Up</h2>
                    <p className="custom-subtitle">Create your account to get started!</p>

                    <form onSubmit={handleSubmit}>
                        <div className="custom-row">
                            <div className="custom-col">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="password"
                                    name="rePassword"
                                    placeholder="Confirm Password"
                                    value={formData.rePassword}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="text"
                                    name="secretKey"
                                    placeholder="Secret Key"
                                    value={formData.secretKey}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col full-width">
                                <button type="submit" className="custom-btn">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OwnerRegister;
