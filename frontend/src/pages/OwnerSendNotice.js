import React, { useState, useEffect } from 'react';
import OwnerSidebar from "../components/SideNav";
import "../styles/OwnerSendNotice.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { getNotices, sendNoticeAPI, deleteNoticeAPI } from '../services/productServices';

const OwnerSendNotice = () => {
    const [notice, setNotice] = useState('');
    const [notices, setNotices] = useState([]);

    // Function to fetch all notices
    const fetchNotices = async () => {
        try {
            const data = await getNotices();
            setNotices(data);
        } catch (error) {
            toast.error("Error fetching notices");
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendNoticeAPI(notice);
            toast.success('Notice sent successfully');
            setNotice('');
            fetchNotices();
        } catch (error) {
            toast.error('Failed to send notice');
        }
    };

    // Delete a notice with confirmation using SweetAlert
    const handleDelete = async (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this notice!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    await deleteNoticeAPI(id);
                    await swal("Notice deleted successfully", { icon: "success" });
                    fetchNotices();
                } catch (error) {
                    swal("Failed to delete notice", { icon: "error" });
                }
            }
        });
    };

    return (
        <div className="owner-send-notice-page">
            <OwnerSidebar />
            <br />
            <div className="content-send-wrapper">
                <div className="notice-send-form-container">
                    <h2>Send Customers Notice (Offers/Promotions/Updates)</h2>
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
                    <h2>Sent Customer Notices</h2>
                    {notices.length > 0 ? (
                        notices.map((n) => (
                            <div key={n.id} className="notice-send-card">
                                <div className="notice-send-content">
                                    <p>{n.notice}</p>
                                    <small>
                                        {n.date ? new Date(n.date).toLocaleString() : ''}
                                    </small>
                                </div>
                                <button
                                    className="btn-send-delete"
                                    onClick={() => handleDelete(n.id)}
                                >
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