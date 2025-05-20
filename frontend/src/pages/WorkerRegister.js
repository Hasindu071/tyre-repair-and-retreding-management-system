import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/WorkerRegister.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkerRegister = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        title: '',
        phone1: '',
        phone2: '',
        nic: '',
        address1: '',
        address2: '',
        profilePicture: null, // Added profile picture state
    });

        const handleAlphaInput = (e) => {
        const charCode = e.which || e.keyCode;
        // If number (characters 48-57), prevent input
        if (charCode >= 48 && charCode <= 57) {
            e.preventDefault();
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture' && files.length > 0) {
            setFormData({
                ...formData,
                profilePicture: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate NIC number (either legacy: 9 digits followed by V/v/X/x OR new: exactly 12 digits)
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

        // Check that a profile picture is selected (should be handled by required attribute as well)
        if (!formData.profilePicture) {
            toast.error("Please select a profile picture!");
            return;
        }

        console.log('Form submitted:', formData);
        navigate('/WorkerSignup', { state: { formData } });
    };

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="register-container-worker">
                <div className="register-box-worker">
                    <h2 className="register-title-worker">
                        Worker <span>REGISTRATION</span>
                    </h2>
                    <form onSubmit={handleSubmit} className="register-form-worker">
                        <div className="form-group-worker">
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter first name"
                                value={formData.firstName}
                                onChange={handleChange}
                                onKeyPress={handleAlphaInput}
                                required
                            />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter last name"
                                value={formData.lastName}
                                onChange={handleChange}
                                onKeyPress={handleAlphaInput}
                                required
                            />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="title">Title:</label>
                            <select
                                style={{ backgroundColor: '#4a4a4a', color: 'rgb(149, 149, 149)', border: 'none' }}
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="form-control"
                            >
                                <option value="">Select Title</option>
                                <option value="Mr">Mr</option>
                                <option value="Ms">Ms</option>
                                <option value="Mrs">Mrs</option>
                            </select>
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="phone1">Phone Number 1:</label>
                            <input
                                type="number"
                                id="phone1"
                                name="phone1"
                                placeholder="Enter primary phone number"
                                value={formData.phone1}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="phone2">Phone Number 2:</label>
                            <input
                                type="number"
                                id="phone2"
                                name="phone2"
                                placeholder="Enter secondary phone number (optional)"
                                value={formData.phone2}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="nic">NIC:</label>
                            <input
                                type="text"
                                id="nic"
                                name="nic"
                                placeholder="Enter NIC"
                                value={formData.nic}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="address1">Address Line 1:</label>
                            <input
                                type="text"
                                id="address1"
                                name="address1"
                                placeholder="Enter address line 1"
                                value={formData.address1}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="address2">Address Line 2:</label>
                            <input
                                type="text"
                                id="address2"
                                name="address2"
                                placeholder="Enter address line 2 (optional)"
                                value={formData.address2}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="profilePicture">Profile Picture:</label>
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="register-button-worker">
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerRegister;