import React, { useState, useEffect } from "react";
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Import the Navbar component
import OwnerSidebar from "../components/SideNav"; // Import the Sidebar component
import "../styles/Notification.css"; // Import CSS file

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/contact/getContact");
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <>
      <OwnerNavbar />
      <OwnerSidebar />
      <div className="notification-container">
        <h2 className="title">Notifications</h2>
        <table className="notification-table">
          <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id}>
                <td>{notification.id}</td>
                <td>{notification.name}</td>
                <td>{notification.email}</td>
                <td>{notification.subject}</td>
                <td>{notification.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Notification;