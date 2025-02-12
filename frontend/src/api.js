import axios from "axios";

const API_URL = "http://localhost:5000";

export const registerOwner = async (ownerData) => {
  try {
    const response = await axios.post(`${API_URL}/OwnerRegister`, ownerData);
    return response.data;
  } catch (error) {
    console.error("Error registering owner:", error);
    throw error;
  }
};