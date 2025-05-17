import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import '../styles/WorkerMessage.css';
import { getWorkerMessages, sendWorkerMessage } from "../services/workerServices";

const WorkerMessage = () => {
    const workerId = localStorage.getItem('workerId') || 1;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = React.useCallback(async () => {
        try {
            const data = await getWorkerMessages(workerId);
            if (Array.isArray(data)) {
                setMessages(data);
            } else {
                console.error("Fetched data is not an array:", data);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }, [workerId]);

    const handleSendMessage = async () => {
        if (newMessage.trim() !== '') {
            try {
                await sendWorkerMessage(workerId, newMessage);
                setNewMessage('');
                fetchMessages();
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [workerId, fetchMessages]);

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-message-container">
                <h2>Worker Messages</h2>
                <h9><em>Chat with your Owner</em></h9>
                <div className="message-box">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.worker_id === Number(workerId) ? 'worker' : 'other'}`}>
                            {msg.message}
                        </div>
                    ))}
                </div>
                <div className="message-input">
                    <textarea 
                        placeholder="Type your message..." 
                        value={newMessage} 
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows="4"  // Adjust row count as needed for a bigger box
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default WorkerMessage;