import { getAuthToken, getApiKey } from "../helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Fetch posts for a specific profile with reactions and comments.
 */
export const fetchProfilePosts = async (profileName) => {
  try {
    const postsResponse = await fetch(
      `${API_BASE_URL}/social/posts?_author=true&_reactions=true&_comments=true`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "X-Noroff-API-Key": getApiKey(),
        },
      }
    );

    if (!postsResponse.ok) {
      const error = await postsResponse.json();
      console.error("Error fetching profile posts:", error);
      throw new Error("Failed to fetch profile posts.");
    }

    const posts = await postsResponse.json();
    const filteredPosts = posts.data.filter((post) => post.author?.name === profileName);

    return filteredPosts;
  } catch (error) {
    console.error("Error in fetchProfilePosts:", error.message);
    throw error;
  }
};