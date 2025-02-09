import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar';  // Assuming you have a NavBar component
import '../styles/customerSignup.css';  // Import the CSS file for styling

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

            <div className="container-customer-signup">
                <div className="card p-4 shadow-sm">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <p className="text-center mb-4">Let's get started!</p>

                    <form onSubmit={handleSubmit}>
                        <div className="row-signup">
                            <div className="col-md-6 mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input
                                    type="password"
                                    name="rePassword"
                                    placeholder="Re-enter Password"
                                    value={formData.rePassword}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-danger w-100">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerSignup;
