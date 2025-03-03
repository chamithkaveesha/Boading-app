import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/rooms";

export const deleteRoom = async (roomId) => {
    try {
     
      const token = sessionStorage.getItem("token");
      const response = await axios.delete(`${API_BASE_URL}/${roomId}`, {
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

