import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar"; // Assuming you have a Navbar component
import '../styles/WorkerMessage.css';

const WorkerMessage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() !== '') {
            setMessages([...messages, { text: newMessage, sender: 'worker' }]);
            setNewMessage('');
        }
    };

    return (
        <div>
            <WorkerNavbar />
        <div className="worker-message-container">
            <h2>Worker Messages</h2>
            <div className="message-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
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
