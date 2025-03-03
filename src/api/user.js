import axios from "axios";
import { jwtDecode } from "jwt-decode";



const API_BASE_URL = "http://localhost:8080/api/users";

const getEmailFromToken = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    console.error("No token available.");
    return null;}

  try {
    const decoded = jwtDecode(token);;
    return decoded?.sub || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getUserByName = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${encodeURIComponent(name)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by name:", error);
    throw error;
  }
};

export const getOwner = async () => {
  const token = sessionStorage.getItem("token");
  const email = getEmailFromToken(); // Fetch email at function call time
  if (!email) {
    console.error("No email available.");
    return null;}; // Avoid making a request if email is missing

  try {
    const response = await axios.get(`${API_BASE_URL}/email`, {
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
    console.error("Error fetching user by email:", error);
    return null; // Return null instead of throwing to avoid breaking the UI
  }
};

export const deleteUser = async () => {
  const token = sessionStorage.getItem("token"); // Fetch token at function call time
  if (!token) {
    console.error("No token available.");
    return;
  }

  try {
    await axios.delete(API_BASE_URL, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
