// contexts/NotificationContext.js
import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadContactCount, setUnreadContactCount] = useState(0);

  const fetchUnreadContactNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5000/contact/getContact");
      const data = await res.json();
      const unread = data.filter(item => item.readStatus === 0).length;
      setUnreadContactCount(unread);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchUnreadContactNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        unreadContactCount,
        refreshUnreadContact: fetchUnreadContactNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
