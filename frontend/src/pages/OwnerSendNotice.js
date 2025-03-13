import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewNavbar from "../components/Navbars/OwnerRegiNavBar"; // Navbar component
import OwnerSidebar from "../components/SideNav";
import "../styles/OwnerSendNotice.css"; // Import CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OwnerSendNotice = () => {
    const [notice, setNotice] = useState('');
    const [notices, setNotices] = useState([]);

    // Function to fetch all notices
    const fetchNotices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/notices');
            setNotices(response.data);
        } catch (error) {
            console.error("Error fetching notices:", error);
            toast.error("Error fetching notices");
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/notices', { notice });
            toast.success('Notice sent successfully');
            setNotice('');
            fetchNotices();
        } catch (error) {
            console.error('Error sending notice:', error);
            toast.error('Failed to send notice');
        }
    };

    // Delete a notice (requires DELETE endpoint on backend)
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/notices/${id}`);
            toast.success('Notice deleted successfully');
            fetchNotices();
        } catch (error) {
            console.error('Error deleting notice:', error);
            toast.error('Failed to delete notice');
        }
    };

    return (
        <div className="owner-send-notice-page">
            <NewNavbar />
            <OwnerSidebar />
            <br></br>
            <div className="content-send-wrapper">
                <div className="notice-send-form-container">
                    <h2>Send Notice</h2>
                    <form onSubmit={handleSubmit} className="notice-send-form">
                        <textarea
                            value={notice}
                            onChange={(e) => setNotice(e.target.value)}
                            placeholder="Type your notice here..."
                            required
                        />
                        <button type="submit" className="btn-submit">Send Notice</button>
                    </form>
                </div>
                <div className="notice-send-list-container">
                    <h2>Sent Notices</h2>
                    {notices.length > 0 ? (
                        notices.map((n) => (
                            <div key={n.id} className="notice-send-card">
                                <div className="notice-send-content">
                                    <p>{n.notice}</p>
                                    <small>{n.date ? new Date(n.date).toLocaleString() : ''}</small>
                                </div>
                                <button className="btn-send-delete" onClick={() => handleDelete(n.id)}>
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No notices found.</p>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OwnerSendNotice;