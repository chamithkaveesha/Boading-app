import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const deleteRoom = async (roomId) => {
    try {
     
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(`${API_ENDPOINTS.ROOMS}/${roomId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to delete room";
    }
  };

