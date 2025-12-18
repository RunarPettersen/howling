import { getAuthToken, getApiKey } from "../helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Deletes a post by ID.
 * @param {string} postId - ID of the post to delete.
 */
export const deletePostById = async (postId) => {
  const token = getAuthToken();
  const apiKey = getApiKey();

  const response = await fetch(`${API_BASE_URL}/social/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete post.");
  }

  return true;
};