import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";


export const createRoom = async (roomData) => {
  const token = sessionStorage.getItem("token");
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

