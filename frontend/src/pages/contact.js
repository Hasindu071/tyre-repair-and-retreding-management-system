import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from '../components/NavBar'; // Import the Navbar component
import '../styles/contact.css'; // Updated CSS file with unique class names
import axios from 'axios'; // Import axios for HTTP requests

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setAlert({ message: 'All fields are required!', type: 'danger' });
            return;
        }

        setLoading(true);
        setAlert({ message: '', type: '' });

        try {
            const response = await axios.post('http://localhost:5000/contact/submit', formData);
            console.log('Form submitted:', response.data);
            setAlert({ message: 'Your message has been sent successfully!', type: 'success' });
            setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
        } catch (error) {
            console.error('There was an error submitting the form!', error);
            setAlert({ message: 'Failed to send your message. Please try again later.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar /> {/* Navbar component */}
            <div className="contact-container">
                <h2 className="contact-title">Contact Us</h2>

                {/* Alert Messages */}
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
