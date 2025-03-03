import axios from "axios";


const API_BASE_URL = "http://localhost:8080/api/payments";

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, paymentData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create payment";
  }
};

export const getPaymentById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch payment";
  }
};

export const getAllPayments = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch payments";
  }
};

export const getPaymentsByRoomId = async (roomId, page = 0, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/room/${roomId}`, {
      headers: getAuthHeaders(),
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch payments by room";
  }
};

export const getPaymentsByRoomIdAndUsers = async (roomId, user1, user2, page = 0, limit = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/room/${roomId}/users`, {
      headers: getAuthHeaders(),
      params: { user1, user2, page, limit },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch payments by room and users";
  }
};

export const getPairwiseBalances = async (roomId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/room/${roomId}/balances`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch pairwise balances";
  }
};
