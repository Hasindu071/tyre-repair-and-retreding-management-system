import axios from "axios";

// Owner Get All Patterns
export const getAllPatterns = async () => {
    const response = await axios.get("http://localhost:5000/patterns/getAll");
    return response.data;
};

// Owner post Pattern Image
export const updatePatternImage = async (patternNum, file) => {
    const formData = new FormData();
    formData.append("patternNum", patternNum);
    formData.append("image", file);

    const response = await axios.post("http://localhost:5000/patterns/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // should include { filePath: "..." }
};

// Owner Get all Workers tasks
export const getWorkerTasks = async (workerId) => {
    try {
        const response = await axios.get(`http://localhost:5000/orders/workersTask/${workerId}`);
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error("Error fetching worker tasks:", error);
        throw error;
    }
};