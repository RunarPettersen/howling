import { getAuthToken, getApiKey } from "../helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Updates a post by ID.
 * @param {string} postId - ID of the post to update.
 * @param {object} postData - Updated data for the post.
 */
export const updatePost = async (postId, postData) => {
  const token = getAuthToken();
  const apiKey = getApiKey();

  const response = await fetch(`${API_BASE_URL}/social/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.map((e) => e.message).join(", ") || "Failed to update post.");
  }

  return await response.json();
};