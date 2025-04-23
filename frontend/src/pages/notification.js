import React, { useState, useEffect } from "react";
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar";
import "../styles/Notification.css";
import { FiBell, FiRefreshCw, FiInbox, FiMail, FiClock, FiTrash2, FiCheck } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/contact/getContact");
      const data = await response.json();
      // Map each notification so that read is true only if readStatus equals 1 
      const formattedData = data.map(notification => ({
        ...notification,
        read: notification.readStatus === 1,
        date: new Date(notification.created_at).toLocaleString()
      }));
      setNotifications(formattedData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      // Send PUT request to update backend status (readStatus becomes 1)
      const response = await fetch(`http://localhost:5000/contact/markAsRead/${id}`, {
        method: "PUT"
      });
      if (response.ok) {
        // Update frontend state upon success: set read to true
        setNotifications(notifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        ));
        toast.success("Marked as read");
      } else {
        toast.error("Failed to mark as read");
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Error marking notification as read");
    }
  };

  const deleteNotification = async (id) => {
    try {
      // Send DELETE request to backend
      const response = await fetch(`http://localhost:5000/contact/deleteNotification/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setNotifications(notifications.filter(notification => notification.id !== id));
        toast.success("Notification deleted");
      } else {
        toast.error("Failed to delete notification");
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Error deleting notification");
    }
  };

  return (
    <>
      <OwnerNavbar />
      <div className="notification-container">
        <h2 className="title-notification">
          <FiBell style={{ verticalAlign: "middle", marginRight: "10px" }} />
          Notifications
        </h2>
        <div className="notification-grid">
          {loading ? (
            <div className="spinner">
              <FiRefreshCw size={32} />
            </div>
          ) : notifications.length === 0 ? (
            <div className="empty-state">
              <FiInbox size={80} />
              <h3>No notifications yet</h3>
              <p>When you receive messages, they'll appear here.</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-card ${notification.read ? "" : "unread"}`}
              >
                <div className="notification-header">
                  <div className="notification-sender">
                    <FiMail style={{ marginRight: "8px" }} />
                    {notification.name}
                  </div>
                  <div className="notification-time">
                    <FiClock style={{ marginRight: "4px" }} />
                    {notification.date}
                  </div>
                </div>
                <div className="notification-subject">{notification.subject}</div>
                <div className="notification-message">{notification.message}</div>
                <div className="notification-email">{notification.email}</div>
                <div className="notification-actions">
                  {!notification.read && (
                    <button
                      className="action-btn read"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <FiCheck style={{ marginRight: "5px" }} />
                      Mark as Read
                    </button>
                  )}
                  <button
                    className="action-btn delete"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <FiTrash2 style={{ marginRight: "5px" }} />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <button className="fab" onClick={fetchNotifications}>
          <FiRefreshCw size={24} />
        </button>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default Notification;