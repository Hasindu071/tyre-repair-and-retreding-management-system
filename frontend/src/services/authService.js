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

// worker login service

const API_URL = "http://localhost:5000";

export const loginWorker = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/Worker/login`, formData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const fetchWorkerProfile = async (workerId) => {
    try {
        const response = await axios.get(`${API_URL}/workerProfile/getWorker/${workerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching worker profile:", error);
        throw error;
    }
};

export const resetWorkerPassword = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/Worker/reset-password`, { email }, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error("Error resetting password:", error);
        throw error;
    }
};

// worker registration service
export const getUsers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// owner registration service
export const registerOwner = async (ownerData) => {
  try {
    const response = await axios.post(`${API_URL}/OwnerRegister`, ownerData);
    return response.data;
  } catch (error) {
    console.error("Error registering owner:", error);
    throw error;
  }
};


// owner login service
export const loginOwner = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/Owner/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in owner:", error.response ? error.response.data : error.message);
    throw error;
  }
};

//customer login
export const loginCustomer = async (credentials) => {
    try {
        const response = await fetch(`${API_URL}/Customer/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        return await response.json();
    } catch (error) {
        console.error('Error in loginCustomer:', error);
        throw error;
    }
};