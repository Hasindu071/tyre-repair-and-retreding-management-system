import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './NavBar'; // Import the Navbar component
import '../styles/contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
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
        // You can add your form submission logic here
    };

    return (
        <div>
            <Navbar /> {/* Add the Navbar component here */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">Contact Us</h2>
                <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea name="message" id="message" value={formData.message} onChange={handleChange} className="form-control" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;