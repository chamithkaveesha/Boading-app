import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const signupUser = async (userData) => {
    try {
        const response = await axios.post(`${API_ENDPOINTS.AUTH}/signup`, userData);
        return response.data; 
    } catch (error) {
        throw error.response?.data || "Something went wrong"; 
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_ENDPOINTS.AUTH}/login`, userData);
        return response.data; 
    } catch (error) {
        throw error.response?.data || "Login failed. Please try again.";
    }
};
