/**
 * API configuration and environment settings
 */

// Determine the API base URL based on environment
const getApiBaseUrl = () => {
  // Use environment variable 
  return import.meta.env.VITE_API_BASE_URL || 'https://your-production-api.com/api';
};

export const API_BASE_URL = getApiBaseUrl();

// API endpoint builders
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: `${API_BASE_URL}/auth`,
  
  // Room endpoints
  ROOMS: `${API_BASE_URL}/rooms`,
  
  // User endpoints
  USERS: `${API_BASE_URL}/users`,
  
  // Payment endpoints
  PAYMENTS: `${API_BASE_URL}/payments`,
};

// Common headers for authenticated requests
export const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// API configuration
export const API_CONFIG = {
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};
