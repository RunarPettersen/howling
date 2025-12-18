import { getAuthToken, getApiKey } from "../helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Follow a profile by name.
 */
export const followProfile = async (profileName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/social/profiles/${profileName}/follow`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "X-Noroff-API-Key": getApiKey(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error following profile:", error);
      throw new Error(error.message || "Failed to follow profile.");
    }

  } catch (error) {
    console.error("Error in followProfile:", error.message);
    throw error;
  }
};

/**
 * Unfollow a profile by name.
 */
export const unfollowProfile = async (profileName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/social/profiles/${profileName}/unfollow`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "X-Noroff-API-Key": getApiKey(),
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error unfollowing profile:", error);
      throw new Error(error.message || "Failed to unfollow profile.");
    }

  } catch (error) {
    console.error("Error in unfollowProfile:", error.message);
    throw error;
  }
};