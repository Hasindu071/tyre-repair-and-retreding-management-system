import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Assuming you have a Navbar component
import '../styles/Inquiries.css';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch customer inquiries from an API or database
        setInquiries([
            { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Need help with my order.' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Inquiry about retreading services.' },
            { id: 3, name: 'Robert Brown', email: 'robert@example.com', message: 'Do you offer bulk discounts?' }
        ]);
    }, []);

    const fetchMessages = async (email) => {
        try {
            const response = await axios.get('http://localhost:5000/workerMessages/getMessages', {
                params: { receiver: email }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '' && selectedInquiry) {
            try {
                await axios.post('http://localhost:5000/workerMessages/sendMessage', {
                    sender: 'owner', // Assuming the sender is the owner
                    receiver: selectedInquiry.email,
                    message: newMessage
                });
                setNewMessage('');
                fetchMessages(selectedInquiry.email); // Refresh messages
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleReplyClick = (inquiry) => {
        setSelectedInquiry(inquiry);
        fetchMessages(inquiry.email);
    };

    return (
        <div>
            <OwnerNavbar />
            <div className="inquiries-container">
                <h2>Worker Inquiries</h2>
                <div className="inquiries-list">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="inquiry-card">
                            <h3>{inquiry.name}</h3>
                            <p><strong>Email:</strong> {inquiry.email}</p>
                            <p><strong>Message:</strong> {inquiry.message}</p>
                            <button className="reply-button" onClick={() => handleReplyClick(inquiry)}>Reply</button>
                        </div>
                    ))}
                </div>
                {selectedInquiry && (
                    <div className="chat-container">
                        <h2>Chat with {selectedInquiry.name}</h2>
                        <div className="message-box">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.sender === 'owner' ? 'owner' : 'worker'}`}>
                                    <strong>{msg.sender}:</strong> {msg.message}
                                </div>
                            ))}
                        </div>
                        <div className="message-input">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inquiries;