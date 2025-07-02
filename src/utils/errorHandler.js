/**
 * Utility functions for handling API errors and displaying user-friendly messages
 */

/**
 * Formats API errors into user-friendly messages
 * @param {Error} error - The error object from the API call
 * @param {string} defaultMessage - Default message if error type is unknown
 * @returns {object} Object with error type and formatted message
 */
export const formatApiError = (error, defaultMessage = "An unexpected error occurred") => {
  if (!error) {
    return { type: 'error', message: defaultMessage };
  }

  const message = error.message || error;

  // Authentication errors
  if (message.includes("Authentication failed") || message.includes("log in again")) {
    return { 
      type: 'auth', 
      message: "Your session has expired. Please log in again." 
    };
  }

  // Permission errors
  if (message.includes("Access denied") || message.includes("permission")) {
    return { 
      type: 'permission', 
      message: "You don't have permission to perform this action." 
    };
  }

  // Network/connection errors
  if (message.includes("Network Error") || message.includes("ECONNREFUSED")) {
    return { 
      type: 'network', 
      message: "Unable to connect to the server. Please check your internet connection." 
    };
  }

  // Validation errors
  if (message.includes("required") || message.includes("invalid")) {
    return { 
      type: 'validation', 
      message: message 
    };
  }

  // Not found errors (empty results)
  if (message.includes("not found") || message.includes("404")) {
    return { 
      type: 'notFound', 
      message: message 
    };
  }

  // Default error
  return { 
    type: 'error', 
    message: message || defaultMessage 
  };
};

/**
 * Handles empty data responses gracefully
 * @param {any} data - The data returned from API
 * @param {string} emptyMessage - Message to show when data is empty
 * @returns {object} Object with isEmpty flag and message
 */
export const handleEmptyData = (data, emptyMessage) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return { 
      isEmpty: true, 
      message: emptyMessage,
      data: Array.isArray(data) ? [] : null
    };
  }

  return { 
    isEmpty: false, 
    data: Array.isArray(data) ? data : [data]
  };
};

/**
 * Safely extracts error message from various error formats
 * @param {any} error - Error from API response
 * @returns {string} Extracted error message
 */
export const extractErrorMessage = (error) => {
  if (!error) return "Unknown error occurred";
  
  // If it's already a string
  if (typeof error === 'string') return error;
  
  // Try to extract from common error object structures
  return error.response?.data?.message || 
         error.response?.data || 
         error.message || 
         error.toString() || 
         "Unknown error occurred";
};
