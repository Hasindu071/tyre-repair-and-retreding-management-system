import axios from "axios";

// worker registration service
export const registerWorker = async (formData) => {
    try {
        const response = await axios.post("http://localhost:5000/WorkerRegister", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error registering worker:", error);
        throw error;
    }
};

// worker login service

const API_URL = "http://localhost:5000";

export const loginWorker = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/Worker/login`, formData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const fetchWorkerProfile = async (workerId) => {
    try {
        const response = await axios.get(`${API_URL}/workerProfile/getWorker/${workerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching worker profile:", error);
        throw error;
    }
};

export const resetWorkerPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/Worker/reset-password`, { email }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};