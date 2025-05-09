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