import axios from "axios";

// worker see payments
export const getWorkerPayments = async (workerId) => {
    try {
        const response = await axios.get(`http://localhost:5000/payments/getWorkerPayments/${workerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching worker payments:", error);
        throw error;
    }
};

// get worker details
export const getApprovedWorkers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/WorkerRegister/approveWorker");
        return response.data;
    } catch (error) {
        console.error("Error fetching approved workers:", error);
        throw error;
    }
};

// get worker details by id
export const getWorkerProfile = async (workerId) => {
    try {
        const response = await fetch(`http://localhost:5000/workerProfile/getWorker/${workerId}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching worker profile:", error);
        throw error;
    }
};

// get worker messages
export const getWorkerMessages = async (workerId) => {
    try {
        const response = await axios.get(`http://localhost:5000/workerMessages/getMessages`, {
            params: { worker_id: workerId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};

// send message worker
export const sendWorkerMessage = async (workerId, message) => {
    try {
        const response = await axios.post("http://localhost:5000/workerMessages/sendMessage", {
            worker_id: workerId,
            message: message
        });
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
};

// get worker detalis in dashboard
export const getWorkerProfileDashboard = async (workerId) => {
    try {
        const response = await axios.get(`http://localhost:5000/workerProfile/getWorker/${workerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching worker profile:", error);
        throw error;
    }
};