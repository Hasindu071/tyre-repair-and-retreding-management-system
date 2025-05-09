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