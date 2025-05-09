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


// This function fetches all products from the server
export const getWorkerStockDecreases = async () => {
    try {
        const response = await axios.get("http://localhost:5000/products/getWorkerStockDecreases");
        return response.data;
    } catch (error) {
        console.error("Error fetching worker stock decreases:", error);
        throw error;
    }
};


// get products
export const ownergetProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/OurProductOwner/getProducts");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};




const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/OurProductOwner";

export const getourProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getProducts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, productData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// get customer orders
export const getCustomerOrderStatus = async (customerId) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/orders/getCustomerOrderStatus?customerId=${customerId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching customer order status:", error);
        throw error;
    }
};