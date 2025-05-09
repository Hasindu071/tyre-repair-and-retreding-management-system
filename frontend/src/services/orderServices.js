import axios from "axios";

export const getAssignedOrders = async (workerId) => {
    try {
        const response = await axios.get("http://localhost:5000/services/getAssignedOrders", {
            params: { workerId }  // Only get tasks for this worker
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching assigned orders:", error);
        throw error;
    }
};

const API_URL = "http://localhost:5000/Orders";

export const getUpdateOrders = async (workerId) => {
    try {
        const response = await axios.get(`${API_URL}/UpdateOrders`, {
            params: { workerId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const getStartedTasks = async () => {
    try {
        const response = await axios.get(`${API_URL}/getStartedTasks`);
        return response.data;
    } catch (error) {
        console.error("Error fetching started tasks:", error);
        throw error;
    }
};

export const startTask = async (taskId) => {
    try {
        const response = await axios.put(`${API_URL}/startTask`, { taskId });
        return response.data;
    } catch (error) {
        console.error("Error starting task:", error);
        throw error;
    }
};

export const updateProgress = async (taskId, progress) => {
    try {
        const response = await axios.put(`${API_URL}/updateProgress`, { taskId, progress });
        return response.data;
    } catch (error) {
        console.error("Error updating progress:", error);
        throw error;
    }
};

//retreading services get detalis
export const getRetreadingDetails = async (id) => {
    try {
        const response = await axios.get(`http://localhost:5000/Retreading/getRetreading/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching retreading details:", error);
        throw error;
    }
};

//retreading services get all patterns
export const getAllPatterns = async () => {
    try {
        const res = await axios.get("http://localhost:5000/patterns/getAll");
        return res.data && res.data.length > 0 ? res.data : [];
    } catch (error) {
        console.error("Error fetching patterns:", error);
        return [];
    }
};

//retreading services get all retreading
export const submitRetreadingForm = async (data) => {
    try {
        const response = await axios.post('http://localhost:5000/Retreading/submit', data);
        return response;
    } catch (error) {
        console.error("Error submitting retreading form:", error);
        throw error;
    }
};

//repairing services submit details
export const submitRepairingForm = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/Repairing/submit", data);
        return response;
    } catch (error) {
        console.error("Error submitting repair form:", error);
        throw error;
    }
};