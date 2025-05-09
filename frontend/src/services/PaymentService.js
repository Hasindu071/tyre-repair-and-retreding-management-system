import axios from "axios";

export const getPayments = async () => {
    try {
        const response = await axios.get("http://localhost:5000/payments/getPayments");
        return response.data;
    } catch (error) {
        console.error("Error fetching payments:", error);
        throw error;
    }
};

export const getWorkers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/orders/getWorkers");
        return response.data;
    } catch (error) {
        console.error("Error fetching workers:", error);
        throw error;
    }
};

export const getWorkerAttendance = async (workerId, year, month) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/attendanceMark/workerAttend/${workerId}`,
            { params: { year, month } }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching worker attendance:", error);
        throw error;
    }
};

export const updatePayment = async (paymentId, data) => {
    try {
        const response = await axios.put(`http://localhost:5000/payments/updatePayment/${paymentId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating payment:", error);
        throw error;
    }
};

export const addPayment = async (data) => {
    try {
        const response = await axios.post("http://localhost:5000/payments/addPayment", data);
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
        throw error;
    }
};

//customer see payment billing
export const getLatestPayment = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5000/payments/latest/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment:", error);
        throw error;
    }
};


//customer see payment billing
export const getIncompleteOrders = async () => {
  try {
    const response = await axios.get("http://localhost:5000/orders/getCompletedTotalAmount0Tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching incomplete orders:", error);
    throw error;
  }
};

export const getcustomerPayments = async () => {
  try {
    const response = await axios.get("http://localhost:5000/CustomerPayment/getPayments");
    return response.data;
  } catch (error) {
    console.error("Error fetching payment records:", error);
    throw error;
  }
};

export const savePayment = async (paymentData) => {
  try {
    const response = await axios.post("http://localhost:5000/CustomerPayment/savePayment", paymentData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting payment record:", error);
    throw error;
  }
};