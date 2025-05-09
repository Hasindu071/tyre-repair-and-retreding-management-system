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