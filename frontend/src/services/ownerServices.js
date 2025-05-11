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

// customer handle
export const fetchCustomers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/customers");
        return response.data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error;
    }
};

export const fetchFullCustomers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/CustomerProfile/getAll");
        return response.data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        throw error;
    }
};

export const updateCustomerProfile = async (customerId, updatedData) => {
    try {
        const response = await axios.put(`http://localhost:5000/CustomerProfile/${customerId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
};

export const deleteCustomer = async (customerId) => {
    try {
        await axios.delete(`http://localhost:5000/CustomerProfile/${customerId}`);
    } catch (error) {
        console.error("Error deleting customer:", error);
        throw error;
    }
};

//contact submit
export const submitContactForm = async (formData) => {
    try {
        const response = await axios.post('http://localhost:5000/contact/submit', formData);
        return response.data;
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

//Assign Worker
export const fetchWorkers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/orders/getWorkers');
    return response.data;
  } catch (error) {
    console.error("Error fetching workers:", error);
    throw error;
  }
};

export const fetchApprovedOrders = async () => {
  try {
    const response = await axios.get('http://localhost:5000/services/approvedOrders');
    return response.data;
  } catch (error) {
    console.error("Error fetching approved orders:", error);
    throw error;
  }
};

export const addOrder = async (orderToSend) => {
  try {
    const response = await axios.post('http://localhost:5000/orders/getOrders', orderToSend);
    return response.data;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
};

export const assignWorker = async (orderId, worker) => {
  try {
    await axios.put(`http://localhost:5000/orders/assignWorker/${orderId}`, { assignedWorker: worker });
  } catch (error) {
    console.error("Error assigning worker:", error);
    throw error;
  }
};

//approve the worker
export const fetchApproveWorkers = async () => {
  try {
    const res = await fetch("http://localhost:5000/WorkerRegister");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    // Filter out workers with status "Removed"
    const filteredData = data.filter(worker => worker.status !== "Removed");
    return filteredData;
  } catch (err) {
    console.error("Error fetching workers:", err);
    throw err;
  }
};

export const updateWorkerStatus = async (id, status) => {
  try {
    const response = await fetch(`http://localhost:5000/WorkerRegister/update-status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error("Failed to update worker status");
    }
    return response;
  } catch (error) {
    console.error("Error updating worker status:", error);
    throw error;
  }
};

//approve orders
export const fetchAssignedOrders = async () => {
    try {
        const response = await axios.get("http://localhost:5000/services/getAssignedOrders");
        return response.data;
    } catch (error) {
        console.error(
            "Error fetching approved orders:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
};

//Owner See Complete Orders
export const fetchCompletedOrders = async () => {
  try {
    const response = await axios.get("http://localhost:5000/orders/getCompletedTasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching completed orders:", error);
    throw error;
  }
};