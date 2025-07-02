import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINTS } from "../config/api";

const getEmailFromToken = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token available. Please log in again.");
  }

  try {
    const decoded = jwtDecode(token);;
    return decoded?.sub || null;
  } catch (error) {
    throw new Error("Invalid authentication token. Please log in again.");
  }
};

export const getUserByName = async (name) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.USERS}/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Failed to fetch user information";
  }
};

export const getOwner = async () => {
  const token = sessionStorage.getItem("token");
  const email = getEmailFromToken(); // Fetch email at function call time
  if (!email) {
    throw new Error("Unable to retrieve user email. Please log in again.");
  }

  try {
    const response = await axios.get(`${API_ENDPOINTS.USERS}/email`, {
      params: { email },
      headers: {
        Authorization: `Bearer ${token}`, // Include auth token
      },
      validateStatus: (status) => status < 500, // Prevents throwing on 404
    });

    if (response.status === 404) {
      return null; // Handle user not found gracefully
      
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Failed to fetch user information";
  }
};

export const deleteUser = async () => {
  const token = sessionStorage.getItem("token"); // Fetch token at function call time
  if (!token) {
    throw new Error("No authentication token available. Please log in again.");
  }

  try {
    await axios.delete(API_ENDPOINTS.USERS, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    throw error.response?.data || error.message || "Failed to delete user account";
  }
};
