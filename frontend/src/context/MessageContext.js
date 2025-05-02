import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MessageContext = createContext();

export const useMessageContext = () => useContext(MessageContext);

export const MessageProvider = ({ children }) => {
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/workerMessages/getMessages`);
            const unread = response.data.filter(msg => !msg.is_read).length;
            setUnreadCount(unread);
        } catch (error) {
            console.error("Error fetching unread count", error);
        }
    };

    useEffect(() => {
        fetchUnreadCount();

        // Optional: poll every 30 seconds
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MessageContext.Provider value={{ unreadCount, fetchUnreadCount }}>
            {children}
        </MessageContext.Provider>
    );
};
