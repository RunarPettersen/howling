const API_BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "4ecabcd1-02e9-423c-a187-f6fca13d760c";

/**
 * Helper function to validate URLs
 */
const isValidUrl = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

/**
 * Registers a new user
 */
export const registerUser = async (userData) => {
  try {
    // Ensure only valid URLs are sent
    const avatarUrl = isValidUrl(userData.avatar?.url) ? userData.avatar.url : "";
    const bannerUrl = isValidUrl(userData.banner?.url) ? userData.banner.url : "";

    const payload = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      bio: userData.bio || "",
      avatar: avatarUrl ? { url: avatarUrl, alt: userData.avatar?.alt || "" } : undefined,
      banner: bannerUrl ? { url: bannerUrl, alt: userData.banner?.alt || "" } : undefined,
      venueManager: userData.venueManager || false,
    };

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Registration API Error:", errorData);
      throw new Error(errorData.errors?.map(e => e.message).join(", ") || errorData.message || "Unknown error.");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration Failed:", error.message);
    throw error;
  }
};


/**
 * Logs in a user
 */
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Login API Error:", errorData);
      throw new Error(errorData.message || "Failed to log in.");
    }

    const { data } = await response.json();
    if (!data.accessToken || !data.name) {
      throw new Error("Invalid server response: Missing accessToken or user data.");
    }

    localStorage.setItem("authToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    console.error("Login Failed:", error.message);
    throw error;
  }
};

/**
 * Creates an API key
 */
export const createApiKey = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${API_BASE_URL}/auth/create-api-key`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Key Error:", errorData);
      throw new Error(errorData.message || "Failed to create API key.");
    }

    const { data } = await response.json();
    localStorage.setItem("apiKey", data.key);
    return data.key;
  } catch (error) {
    console.error("API Key Creation Failed:", error.message);
    throw error;
  }
};