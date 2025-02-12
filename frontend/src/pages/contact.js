import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../components/NavBar'; // Import the Navbar component
import '../styles/contact.css'; // Updated CSS file with unique class names

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
        // Add form submission logic here
    };

    return (
        <div>
            <Navbar /> {/* Navbar component */}
            <div className="contact-container">
                <h2 className="contact-title">Contact Us</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="contact-form-group">
                        <label htmlFor="name" className="contact-label">Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="contact-input" required />
                    </div>
                    <div className="contact-form-group">
                        <label htmlFor="email" className="contact-label">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="contact-input" required />
                    </div>
                    <div className="contact-form-group">
                        <label htmlFor="subject" className="contact-label">Subject</label>
                        <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} className="contact-input" required />
                    </div>
                    <div className="contact-form-group">
                        <label htmlFor="message" className="contact-label">Message</label>
                        <textarea name="message" id="message" value={formData.message} onChange={handleChange} className="contact-textarea" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="contact-submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;