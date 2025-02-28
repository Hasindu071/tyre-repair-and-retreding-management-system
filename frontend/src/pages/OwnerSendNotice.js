import React, { useState } from 'react';
import axios from 'axios';

const OwnerSendNotice = () => {
    const [notice, setNotice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/notices', { notice });
            alert('Notice sent successfully');
            setNotice('');
        } catch (error) {
            console.error('Error sending notice:', error);
            alert('Failed to send notice');
        }
    };

    return (
        <div>
            <div className="container">
                <h2>Send Notice</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={notice}
                        onChange={(e) => setNotice(e.target.value)}
                        placeholder="Type your notice here..."
                        required
                    />
                    <button type="submit">Send Notice</button>
                </form>
            </div>
        </div>
    );
};

export default OwnerSendNotice;