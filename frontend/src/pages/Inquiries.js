import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar";
import '../styles/Inquiries.css';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/workerMessages/getMessages`);
            setInquiries(response.data);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
        }
    };

    const fetchMessages = useCallback(async (email) => {
        try {
            const response = await axios.get(`http://localhost:5000/workerMessages/getMessages`, {
                params: { receiver: email }
            });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }, []);

    const markAsRead = async (inquiryId) => {
        try {
            await axios.put(`http://localhost:5000/workerMessages/markAsRead/${inquiryId}`);
            fetchInquiries();
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    };

    const deleteInquiry = async (inquiryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this inquiry?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/workerMessages/deleteMessage/${inquiryId}`);
            fetchInquiries();
            if (selectedInquiry && selectedInquiry.id === inquiryId) {
                setSelectedInquiry(null);
                setMessages([]);
            }
        } catch (error) {
            console.error('Error deleting inquiry:', error);
        }
    };

    const handleInquiryClick = (inquiry) => {
        setSelectedInquiry(inquiry);
        fetchMessages(inquiry.email);
        if (!inquiry.is_read) {
            markAsRead(inquiry.id);
        }
    };

    return (
        <div>
                <OwnerNavbar unreadCount={inquiries.filter(i => !i.is_read).length} />
                <div className="inquiries-container">
                <h2>Customer Inquiries</h2>
                <div className="inquiries-list">
                    {inquiries.map((inquiry) => (
                        <div 
                            key={inquiry.id} 
                            className={`inquiry-card ${inquiry.is_read ? 'read' : 'unread'}`}
                            onClick={() => handleInquiryClick(inquiry)}
                        >
                            <h3>{inquiry.firstName} {inquiry.lastName}</h3>
                            <p><strong>Email:</strong> {inquiry.email}</p>
                            <p><strong>Message:</strong> {inquiry.message}</p>
                            <p className="status">{inquiry.is_read ? 'Read' : 'Unread'}</p>
                            <div className="inquiry-actions">
                                {!inquiry.is_read && (
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            markAsRead(inquiry.id);
                                        }}
                                        className="mark-read-btn"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteInquiry(inquiry.id);
                                    }}
                                    className="delete-btn"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inquiries;