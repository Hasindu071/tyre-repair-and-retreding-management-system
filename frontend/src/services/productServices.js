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