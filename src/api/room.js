import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/rooms";

export const deleteUserFromRoom = async (uirId, roomId) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/roomer`,
      {
        params: {
          uirId: uirId,
          roomId: roomId
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Failed to delete user from room";
  }
};

export const addAccountToMember = async (email, uirId) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/AddAccount`,
      null,
      {
        params: {
          email: email,
          uirId: uirId
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message || "Failed to add account to member";
  }
};

