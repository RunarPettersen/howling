import { getAuthToken, getApiKey } from "../helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Creates a new post.
 * @param {object} postData - Data for the new post.
 */
export const createPost = async (postData) => {
  const token = getAuthToken();
  const apiKey = getApiKey();

  const response = await fetch(`${API_BASE_URL}/social/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.map((e) => e.message).join(", ") || "Failed to create post.");
  }

  return await response.json();
};