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


// Fetch all inquiries/messages
export const getWorkerMessages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/workerMessages/getMessages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    throw error;
  }
};

// Fetch messages for a specific receiver email
export const getMessagesByReceiver = async (email) => {
  try {
    const response = await axios.get(`${BASE_URL}/workerMessages/getMessages`, {
      params: { receiver: email }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching messages for receiver:", error);
    throw error;
  }
};

// Mark a specific inquiry/message as read
export const markWorkerMessageAsRead = async (inquiryId) => {
  try {
    const response = await axios.put(`${BASE_URL}/workerMessages/markAsRead/${inquiryId}`);
    return response.data;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
};

// Delete a specific inquiry/message
export const deleteWorkerMessage = async (inquiryId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/workerMessages/deleteMessage/${inquiryId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};