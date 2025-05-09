import axios from "axios";

//woker performance report
export const getWorkerPerformanceReport = async (startDate, endDate) => {
    try {
        const response = await axios.get("http://localhost:5000/reports/workerPerformance", {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching worker performance report:", error);
        throw error;
    }
};

// complete task show all tasks report
export const fetchServiceCompletionReport = async (startDate, endDate) => {
    try {
        const response = await axios.get("http://localhost:5000/eports/serviceCompletion", {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching service completion report:", error);
        throw error;
    }
};

// revenue report
export const fetchRevenueReport = async (startDate, endDate) => {
    try {
        const response = await axios.get("http://localhost:5000/reports/revenue", {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching revenue report:", error);
        throw error;
    }
};

//get the inventory reports
export const getInventoryReport = async (startDate, endDate) => {
    try {
        const response = await axios.get("http://localhost:5000/reports/inventoryPartsUsage", {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching inventory report:", error);
        throw error;
    }
};