import axios from "axios";
import { API_ENDPOINTS, getAuthHeaders } from "../config/api";

export const createPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_ENDPOINTS.PAYMENTS}/create`, paymentData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to create payment";
  }
};

export const getPaymentById = async (id) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.PAYMENTS}/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch payment";
  }
};

export const getAllPayments = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.PAYMENTS, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch payments";
  }
};

export const getPaymentsByRoomId = async (roomId, page, limit) => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.PAYMENTS}/room/${roomId}`, {
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
    const response = await axios.get(`${API_ENDPOINTS.PAYMENTS}/room/${roomId}/users`, {
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
    const response = await axios.get(`${API_ENDPOINTS.PAYMENTS}/room/${roomId}/balances`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch pairwise balances";
  }
};
