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

//get Daily Order Summary Report
export const getDailyOrderSummaryReport = async (startDate) => {
    try {
        const response = await axios.get("http://localhost:5000/reports/dailyOrdersSummary", {
            params: { startDate }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching daily orders summary:", error);
        throw error;
    }
};

//Cancellation Report
export const fetchCancellationReport = async (startDate, endDate) => {
    try {
        const response = await axios.get("http://localhost:5000/reports/cancellation-refunds", {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cancellation report:", error);
        throw error;
    }
};

// Attendance Report
export const fetchAttendanceReport = async (startDate, endDate) => {
    try {
        const response = await axios.get("http://localhost:5000/reports/attendance-productivity", {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching attendance report:", error);
        throw error;
    }
};

