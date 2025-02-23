import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Fetch rooms by user ID
export const fetchRoomsByUserId = async (userId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms/roomer/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch rooms";
  }
};

// Fetch users in a room
export const fetchRoomUsers = async (roomId, token) => {
  try {
    if (!roomId) throw new Error("Room ID is required");
    const response = await axios.get(`${API_BASE_URL}/rooms/${roomId}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch room users";
  }
};

// Create a new room
export const createRoom = async (roomData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rooms`, roomData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create room";
  }
};

// Add a user to a room
export const addUserToRoom = async (roomId, userData, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/rooms/${roomId}/users`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to add user to room";
  }
};
