import { getAuthToken, getApiKey } from "../helpers.js";
import { fetchProfilePosts } from "./fetchProfilePosts.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Fetch a profile by name with optional details.
 * Includes followers, following, and posts with reactions and comments.
 */
export const fetchProfile = async (profileName) => {
  try {
    const profileResponse = await fetch(
      `${API_BASE_URL}/social/profiles/${profileName}?_followers=true&_following=true`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "X-Noroff-API-Key": getApiKey(),
        },
      }
    );

    if (!profileResponse.ok) {
      const error = await profileResponse.json();
      console.error("Error fetching profile:", error);
      throw new Error(error.message || "Failed to fetch profile.");
    }

    const profile = await profileResponse.json();

    profile.data.posts = await fetchProfilePosts(profileName);

    return profile.data;
  } catch (error) {
    console.error("Error in fetchProfile:", error.message);
    throw error;
  }
};