import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../components/NavBar';
import '../styles/contact.css';
import { submitContactForm } from '../services/ownerServices';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const validateEmail = (email) => {
        // Simple email regex validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // Validate that name contains only letters and spaces
    const validateName = (name) => {
        const re = /^[A-Za-z\s]+$/;
        return re.test(name);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Prevent digits from being typed into the Name field
    const handleNameKeyPress = (e) => {
        if (/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation: ensure all fields are provided
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setAlert({ message: 'All fields are required!', type: 'danger' });
            return;
        }

        // Validate that name doesn't include numbers or special characters
        if (!validateName(formData.name)) {
            setAlert({ message: 'Name should only contain letters and spaces!', type: 'danger' });
            return;
        }

        // Additional validation: valid email format
        if (!validateEmail(formData.email)) {
            setAlert({ message: 'Please enter a valid email address!', type: 'danger' });
            return;
        }

        // Optional: add additional validation rules here (e.g., subject length)

        setLoading(true);
        setAlert({ message: '', type: '' });

        try {
            const response = await submitContactForm(formData);
            console.log('Form submitted:', response);
            setAlert({ message: 'Your message has been sent successfully!', type: 'success' });
            // Clear form
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            setAlert({ message: 'Failed to send your message. Please try again later.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="contact-container">
                <h2 className="contact-title">Contact Us</h2>

                {alert.message && (
                    <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="contact-form-group">
                        <label htmlFor="name" className="contact-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            onKeyPress={handleNameKeyPress}
                            className="contact-input"
                            required
                        />
                    </div>
                    <div className="contact-form-group">
                        <label htmlFor="email" className="contact-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="contact-input"
                            required
                        />
                    </div>
                    <div className="contact-form-group">
                        <label htmlFor="subject" className="contact-label">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="contact-input"
                            required
                        />
                    </div>
                    <div className="contact-form-group">
                        <label htmlFor="message" className="contact-label">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="contact-textarea"
                            rows="5"
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="contact-submit-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;