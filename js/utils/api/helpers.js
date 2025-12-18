const API_KEY = "4ecabcd1-02e9-423c-a187-f6fca13d760c";

/**
 * Retrieves the authentication token from localStorage.
 * Throws an error if the token is missing.
 * @returns {string} Auth token
 */
export const getAuthToken = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authentication token is missing. Please log in to continue.");
  }
  return token;
};

/**
 * Retrieves the API key from localStorage or uses the hardcoded default.
 * Throws an error if no API key is available.
 * @returns {string} API key
 */
export const getApiKey = () => {
  const apiKey = localStorage.getItem("apiKey") || API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing. Ensure the API key is stored or set as a default.");
  }
  return apiKey;
};