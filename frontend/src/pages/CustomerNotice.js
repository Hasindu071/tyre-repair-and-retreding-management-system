import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CustomerNotice.css'; // Import the CSS file
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Assuming you have a Navbar component

const CustomerNotice = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/notices');
                setNotices(response.data);
            } catch (error) {
                console.error('Error fetching notices:', error);
            }
        };

        fetchNotices();
    }, []);

    return (
        <div>
            <NewNavbar />
            <div className="notice-board">
                <h2 className="board-title">📌 Notice Board</h2>
                <div className="notices-container">
                    {notices.length > 0 ? (
                        notices.map((notice, index) => (
                            <div key={index} className="notice-card">
                                <p>{notice.notice}</p>
                            </div>
                        ))
                    ) : (
                        <p className="no-notices">No notices available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerNotice;
