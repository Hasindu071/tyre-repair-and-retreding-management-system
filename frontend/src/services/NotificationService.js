import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/contact/getContact`);
    // Format notifications as needed
    return response.data.map(notification => ({
      ...notification,
      read: notification.readStatus === 1,
      date: new Date(notification.created_at).toLocaleString()
    }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/contact/markAsRead/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

export const deleteNotificationService = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/contact/deleteNotification/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting notification:", error);
    throw error;
  }
};