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