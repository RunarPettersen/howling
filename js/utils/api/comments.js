import { getAuthToken, getApiKey } from "./helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Adds a comment to a post
 * @param {number} postId - ID of the post
 * @param {string} commentBody - Text of the comment
 */
export const addCommentToPost = async (postId, commentBody) => {
  const token = getAuthToken();
  const apiKey = getApiKey();

  const response = await fetch(`${API_BASE_URL}/social/posts/${postId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify({ body: commentBody }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Error adding comment:", error);
    throw new Error(error.message || "Failed to add comment.");
  }

  return await response.json();
};