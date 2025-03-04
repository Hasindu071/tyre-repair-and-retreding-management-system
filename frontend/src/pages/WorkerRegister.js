import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
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
            <div className="register-container-worker">
                <div className="register-box-worker">
                    <h2 className="register-title-worker">Worker <span>REGISTRATION</span></h2>
                    <form onSubmit={handleSubmit} className="register-form-worker">
                        <div className="form-group-worker">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" placeholder="Enter first name" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" placeholder="Enter last name" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="title">Title:</label>
                            <input type="text" id="title" name="title" placeholder="Enter job title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="phone1">Phone Number 1:</label>
                            <input type="text" id="phone1" name="phone1" placeholder="Enter primary phone number" value={formData.phone1} onChange={handleChange} required />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="phone2">Phone Number 2:</label>
                            <input type="text" id="phone2" name="phone2" placeholder="Enter secondary phone number (optional)" value={formData.phone2} onChange={handleChange} />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="nic">NIC:</label>
                            <input type="text" id="nic" name="nic" placeholder="Enter NIC" value={formData.nic} onChange={handleChange} required />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="address1">Address Line 1:</label>
                            <input type="text" id="address1" name="address1" placeholder="Enter address line 1" value={formData.address1} onChange={handleChange} required />
                        </div>
                        <div className="form-group-worker">
                            <label htmlFor="address2">Address Line 2:</label>
                            <input type="text" id="address2" name="address2" placeholder="Enter address line 2 (optional)" value={formData.address2} onChange={handleChange} />
                        </div>
                        <button type="submit" className="register-button-worker">Next</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerRegister;
