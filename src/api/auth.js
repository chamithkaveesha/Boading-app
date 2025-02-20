import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; 

export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data; 
    } catch (error) {
        throw error.response?.data || "Something went wrong"; 
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data; 
    } catch (error) {
        throw error.response?.data || "Login failed. Please try again.";
    }
};
