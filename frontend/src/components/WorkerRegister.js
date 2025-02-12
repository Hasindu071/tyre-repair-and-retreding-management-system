import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar';
import '../styles/WorkerRegister.css'; // Import the CSS file for styling

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
        navigate('/WorkerSignup', { state: { formData } });
    };

    return (
        <div>
            <Navbar />
            <div className="register-container">
                <div className="register-box">
                    <h2 className="register-title">Worker <span>REGISTRATION</span></h2>
                    <form onSubmit={handleSubmit} className="register-form">
                        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                        <input type="text" name="phone1" placeholder="Phone Number 1" value={formData.phone1} onChange={handleChange} required />
                        <input type="text" name="phone2" placeholder="Phone Number 2" value={formData.phone2} onChange={handleChange} />
                        <input type="text" name="nic" placeholder="NIC" value={formData.nic} onChange={handleChange} required />
                        <input type="text" name="address1" placeholder="Address Line 1" value={formData.address1} onChange={handleChange} required />
                        <input type="text" name="address2" placeholder="Address Line 2" value={formData.address2} onChange={handleChange} />
                        <button type="submit" className="register-button-worker">Next</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerRegister;
