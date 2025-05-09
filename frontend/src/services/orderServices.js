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