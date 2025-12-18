import { getAuthToken, getApiKey } from "./helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Fetch a single post by ID with optional query parameters.
 */
export const fetchPostById = async (postId) => {
  const queryParams = new URLSearchParams({
    _author: true,
    _comments: true,
    _reactions: true,
    _reactions: true,
    _comments: true, 
  });

  const response = await fetch(`${API_BASE_URL}/social/posts/${postId}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      "X-Noroff-API-Key": getApiKey(),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Error fetching post:", error);
    throw new Error(error.message || "Failed to fetch post.");
  }

  const { data } = await response.json();
  return data;
};