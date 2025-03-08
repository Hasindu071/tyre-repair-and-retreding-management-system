import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar"; // Assuming you have a Navbar component
import '../styles/WorkerMessage.css';

const WorkerMessage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const workerId = 1;

    const fetchMessages = async () => {
        try {
            // Pass worker_id as query parameter so backend returns only relevant messages
            const response = await fetch(`http://localhost:5000/workerMessages/getMessages?worker_id=${workerId}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setMessages(data);
            } else {
                console.error("Fetched data is not an array:", data);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            try {
                const response = await fetch("http://localhost:5000/workerMessages/sendMessage", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ worker_id: workerId, message: newMessage }),
                });

                if (response.ok) {
                    setNewMessage('');
                    fetchMessages(); // Refresh messages after successful send
                } else {
                    const errData = await response.json();
                    console.error("Error sending message:", errData);
                }
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-message-container">
                <h2>Worker Messages</h2>
                <div className="message-box">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.worker_id === workerId ? 'worker' : 'other'}`}>
                            {msg.message}
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
        </div>
    );
};

export default WorkerMessage;