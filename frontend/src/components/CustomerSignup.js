import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar';  // Assuming you have a NavBar component
import '../styles/customerSignup.css';  // Updated CSS file name

const CustomerSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rePassword: ''
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

            <div className="customer-signup-container">
                <div className="customer-signup-card">
                    <h2 className="customer-signup-title">Customer <span>SignUp</span></h2>

                    <form onSubmit={handleSubmit}>
                        <div className="customer-signup-form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="customer-signup-input"
                                required
                            />
                        </div>
                        <div className="customer-signup-form-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="customer-signup-input"
                                required
                            />
                        </div>
                        <div className="customer-signup-form-group">
                            <input
                                type="password"
                                name="rePassword"
                                placeholder="Re-enter Password"
                                value={formData.rePassword}
                                onChange={handleChange}
                                className="customer-signup-input"
                                required
                            />
                        </div>
                        <div className="customer-signup-form-group">
                                <input
                                    type="text"
                                    name="secretKey"
                                    placeholder="Secret Key"
                                    value={formData.secretKey}
                                    onChange={handleChange}
                                    className="customer-signup-input"
                                    required
                                />
                            </div>
                        <button type="submit" className="customer-signup-button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerSignup;
