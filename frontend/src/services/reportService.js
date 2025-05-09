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