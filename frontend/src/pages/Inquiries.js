import React, { useState, useEffect } from 'react';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Assuming you have a Navbar component
import '../styles/Inquiries.css';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        // Fetch customer inquiries from an API or database
        setInquiries([
            { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Need help with my order.' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Inquiry about retreading services.' },
            { id: 3, name: 'Robert Brown', email: 'robert@example.com', message: 'Do you offer bulk discounts?' }
        ]);
    }, []);

    return (
        <div>
            <OwnerNavbar />
        <div className="inquiries-container">
            <h2>Customer Inquiries</h2>
            <div className="inquiries-list">
                {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="inquiry-card">
                        <h3>{inquiry.name}</h3>
                        <p><strong>Email:</strong> {inquiry.email}</p>
                        <p><strong>Message:</strong> {inquiry.message}</p>
                        <button className="reply-button">Reply</button>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default Inquiries;