import React, { useState, useEffect } from "react";
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar";
import "../styles/Notification.css";
import { FiBell, FiRefreshCw, FiInbox, FiMail, FiClock, FiTrash2, FiCheck } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNotifications, markNotificationAsRead, deleteNotificationService } from "../services/NotificationService";
import swal from "sweetalert";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const formattedData = await getNotifications();
      setNotifications(formattedData);
      const count = formattedData.filter(n => !n.read).length;
      setUnreadCount(count);
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
      await markNotificationAsRead(id);
      setNotifications(notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      ));
      setUnreadCount(prev => prev - 1);
      toast.success("Marked as read");
      fetchNotifications();
      window.location.reload();
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Error marking notification as read");
    }
  };

  const deleteNotification = async (id) => {
    try {
      const notificationToDelete = notifications.find(n => n.id === id);
      await deleteNotificationService(id);
      setNotifications(notifications.filter(notification => notification.id !== id));
      if (notificationToDelete && !notificationToDelete.read) {
        setUnreadCount(prev => prev - 1);
      }
      toast.success("Notification deleted");
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Error deleting notification");
    }
  };

  return (
    <>
      <OwnerNavbar unreadCount={unreadCount} />
      <div className="notification-container">
        <h2 className="title-notification">
          <FiBell style={{ verticalAlign: "middle", marginRight: "10px" }} />
          Notifications in UserFeedbacks {unreadCount > 0 && `(${unreadCount} unread)`}
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
                    onClick={() => {
                      swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover this notification!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                      }).then(async (willDelete) => {
                        if (willDelete) {
                          await deleteNotification(notification.id);
                          swal("Notification deleted successfully", { icon: "success" });
                        }
                      });
                    }}
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