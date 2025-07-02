import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const addUserToRoom = async (roomId, userData) => {
  const token = sessionStorage.getItem("token");
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.ROOMS}/${roomId}/users`,
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