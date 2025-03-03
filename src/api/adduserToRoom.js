import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const addUserToRoom = async (roomId, userData) => {
  const token = sessionStorage.getItem("token");
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