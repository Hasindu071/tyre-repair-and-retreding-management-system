import axios from 'axios';

export const registerCustomer = async (customerData) => {
    try {
        const response = await axios.post('http://localhost:5000/CustomerRegister', customerData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error registering customer:', error);
        throw error;
    }
};


//check the nic number
export const checkNICAvailability = async (nic) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/CustomerRegister',
            { nic },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.error('Error checking NIC:', error);
        throw error;
    }
};

//customer profile
export const getCustomerProfile = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:5000/customerProfile/getProfile/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
};

export const updateCustomerProfile = async (userId, profileData) => {
    try {
        const response = await axios.put(`http://localhost:5000/customerProfile/${userId}`, profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};