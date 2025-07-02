import axios from "axios";
import { getOwner } from "./user";
import { API_BASE_URL } from "../config/api";

// Fetch rooms by user ID
export const fetchRoomsByUserId = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const user = await getOwner();
    const userId = user?.id;
    
    if (!userId) {
      throw new Error("User not found. Please log in again.");
    }
    
    const response = await axios.get(`${API_BASE_URL}/rooms/roomer/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    // Handle different response formats
    const rooms = response.data;
    
    // If response is null, undefined, or empty array, return empty array
    if (!rooms || (Array.isArray(rooms) && rooms.length === 0)) {
      return [];
    }
    
    // Ensure we always return an array
    return Array.isArray(rooms) ? rooms : [rooms];
    
  } catch (error) {
    // Handle specific HTTP status codes
    if (error.response?.status === 404) {
      // User has no rooms - return empty array instead of throwing
      return [];
    }
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    }
    if (error.response?.status === 403) {
      throw new Error("Access denied. You don't have permission to view rooms.");
    }
    
    // For other errors, throw with meaningful message
    throw error.response?.data?.message || error.message || "Failed to fetch rooms";
  }
};

// Fetch users in a room
export const fetchRoomUsers = async (roomId) => {
  const token = sessionStorage.getItem("token");
  try {
    if (!roomId) {
      throw new Error("Room ID is required");
    }
    
    const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    const users = response.data;
    
    // Handle empty response or no users in room
    if (!users || (Array.isArray(users) && users.length === 0)) {
      return [];
    }
    
    // Ensure we always return an array
    return Array.isArray(users) ? users : [users];
    
  } catch (error) {
    // Handle specific HTTP status codes
    if (error.response?.status === 404) {
      // Room has no users or room not found - return empty array
      return [];
    }
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please log in again.");
    }
    if (error.response?.status === 403) {
      throw new Error("Access denied. You don't have permission to view room users.");
    }
    
    throw error.response?.data?.message || error.message || "Failed to fetch room users";
  }
};

// Create a new room


// Add a user to a room

