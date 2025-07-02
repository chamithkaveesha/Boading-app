import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const createRoom = async (roomData) => {
  const token = sessionStorage.getItem("token");
    try {
      const response = await axios.post(`${API_ENDPOINTS.ROOMS}`, roomData, {
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

