import { getAuthToken, getApiKey } from "./helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Toggles a reaction on a post.
 * @param {number} postId - The ID of the post to react to.
 * @param {string} symbol - The emoji symbol for the reaction.
 * @returns {Object} - The updated reactions data.
 */
export const toggleReaction = async (postId, symbol) => {
  const token = getAuthToken();
  const apiKey = getApiKey();

  const response = await fetch(`${API_BASE_URL}/social/posts/${postId}/react/${symbol}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Error toggling reaction:", error);
    throw new Error(error.message || "Failed to toggle reaction.");
  }

  return response.json();
};