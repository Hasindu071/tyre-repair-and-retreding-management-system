import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar";
import '../styles/Inquiries.css';

// Define workerId (you could retrieve it from localStorage or your auth context)
const workerId = localStorage.getItem('workerId') || 'default-worker-id';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/workerMessages/getMessages?worker_id=${workerId}`);
            setInquiries(response.data);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    };

    const fetchMessages = useCallback(async (email) => {
        try {
            const response = await axios.get(`http://localhost:5000/workerMessages/getMessages?worker_id=${workerId}`, {
                params: { receiver: email }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, []);

    const handleReplyClick = (inquiry) => {
        setSelectedInquiry(inquiry);
        fetchMessages(inquiry.email);
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '' && selectedInquiry) {
            try {
                const response = await axios.post('http://localhost:5000/workerMessages/sendMessage', {
                    sender: 'owner', // owner is replying
                    receiver: selectedInquiry.email,
                    message: newMessage
                });
                if (response.status === 201) {
                    setNewMessage('');
                    // Refresh conversation after sending
                    fetchMessages(selectedInquiry.email);
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <OwnerNavbar />
            <div className="inquiries-container">
                <h2>Customer Inquiries</h2>
                <div className="inquiries-list">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="inquiry-card">
                            <h3>{inquiry.name}</h3>
                            <p><strong>Worker ID:</strong> {inquiry.worker_id}</p>
                            <p><strong>Initial Message:</strong> {inquiry.message}</p>
                            <button className="reply-button" onClick={() => handleReplyClick(inquiry)}>
                                View Conversation / Reply
                            </button>
                        </div>
                    ))}
                </div>
                {selectedInquiry && (
                    <div className="chat-container">
                        <h2>Conversation with {selectedInquiry.name}</h2>
                        <div className="message-box">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`message ${
                                            msg.sender === 'owner'
                                                ? 'owner'
                                                : msg.sender === 'worker'
                                                ? 'worker'
                                                : 'customer'
                                        }`}
                                    >
                                        <strong>
                                            {msg.sender === 'worker'
                                                ? 'Worker'
                                                : msg.sender.charAt(0).toUpperCase() + msg.sender.slice(1)}
                                            :
                                        </strong>{' '}
                                        {msg.message}
                                    </div>
                                ))
                            ) : (
                                <p>No messages yet.</p>
                            )}
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