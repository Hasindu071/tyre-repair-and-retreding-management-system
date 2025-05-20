import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/customerRegister.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkNICAvailability } from '../services/CustomerService';

const CustomerRegister = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nic: '',
        phone1: '',
        phone2: '',
        houseName: '',
        city: '',
        state: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate NIC number (either legacy: 9 digits + V/v/X/x OR new: exactly 12 digits)
        const nicRegex = /^(?:[0-9]{9}[VvXx]|\d{12})$/;
        if (!nicRegex.test(formData.nic)) {
            toast.error("Please enter a valid NIC number!");
            return;
        }

        // Validate Phone Number 1 (exactly 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone1)) {
            toast.error("Please enter a valid 10-digit phone number for Phone Number 1!");
            return;
        }

        // Validate Phone Number 2 if provided (exactly 10 digits)
        if (formData.phone2 && formData.phone2.trim() !== "" && !phoneRegex.test(formData.phone2)) {
            toast.error("Please enter a valid 10-digit phone number for Phone Number 2!");
            return;
        }

        // Check NIC availability using the service method
        try {
            const data = await checkNICAvailability(formData.nic);
            if (data.exists) {
                toast.error("NIC already exists!");
                return;
            }

            console.log('Form submitted:', formData);
            navigate('/CustomerSignup', { state: { formData, registrationSuccess: true } });
        } catch (err) {
            console.error('Error checking NIC:', err);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="container-customer-register">
                <div className="card p-4 shadow-sm">
                    <h2 className="register-customer-title">
                        Customer <span>REGISTRATION</span>
                    </h2>
                    <p className="text-center mb-4">Let's get started!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="firstName">First Name:</label>
                                <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={formData.firstName}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                    if (!/[A-Za-z\s']/.test(e.key)) {
                                    e.preventDefault();
                                    }
                                }}
                                className="form-control"
                                required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="lastName">Last Name:</label>
                                <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                    if (!/[A-Za-z\s']/.test(e.key)) {
                                    e.preventDefault();
                                    }
                                }}
                                className="form-control"
                                required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone1">Phone Number 1:</label>
                                <input
                                    type="text"
                                    id="phone1"
                                    name="phone1"
                                    placeholder="Enter phone number"
                                    value={formData.phone1}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="nic">NIC:</label>
                                <input
                                    type="text"
                                    id="nic"
                                    name="nic"
                                    placeholder="Enter NIC"
                                    value={formData.nic}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="phone2">Phone Number 2 (Optional):</label>
                                <input
                                    type="text"
                                    id="phone2"
                                    name="phone2"
                                    placeholder="Enter phone number"
                                    value={formData.phone2}
                                    onChange={handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="houseName">House Name:</label>
                                <input
                                    type="text"
                                    id="houseName"
                                    name="houseName"
                                    placeholder="Enter house name"
                                    value={formData.houseName}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="state">State:</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    placeholder="Enter state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="city">City:</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Enter city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-danger w-100">
                                    Next
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerRegister;