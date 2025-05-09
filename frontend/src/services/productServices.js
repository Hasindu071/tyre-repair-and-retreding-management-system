import axios from "axios";

export const getProducts = async () => {
    try {
        const response = await axios.get("http://localhost:5000/products/getProducts");
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const decreaseStock = async (id, workerId, decreaseAmount) => {
    try {
        const response = await axios.put(`http://localhost:5000/products/decreaseStock/${id}`, {
            workerId,
            decreaseAmount,
        });
        return response.data;
    } catch (error) {
        console.error("Error decreasing stock:", error);
        throw error;
    }
};



// This function fetches all notices from the server
export const getNotices = async () => {
    try {
        const response = await axios.get('http://localhost:5000/notices');
        return response.data;
    } catch (error) {
        console.error("Error fetching notices:", error);
        throw error;
    }
};

// This function sends a notice to the server
export const sendNoticeAPI = async (notice) => {
    try {
        const response = await axios.post('http://localhost:5000/notices', { notice });
        return response.data;
    } catch (error) {
        console.error('Error sending notice:', error);
        throw error;
    }
};

// This function deletes a notice from the server
export const deleteNoticeAPI = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/notices/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting notice:', error);
        throw error;
    }
};