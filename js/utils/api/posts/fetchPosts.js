import { getAuthToken, getApiKey } from "../helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Fetch posts with optional pagination, sorting, and filtering.
 * @param {number} page - Page number (default: 1).
 * @param {number} limit - Number of posts per page (default: 10).
 * @param {string} sortOrder - Sort order ("asc" for oldest, "desc" for newest).
 * @param {boolean} filterImages - Whether to only show posts with images.
 */
export const fetchPosts = async (page = 1, limit = 10, sortOrder = "desc", filterImages = false) => {
  const token = getAuthToken();
  const apiKey = getApiKey();

  const queryParams = new URLSearchParams({
    _author: true,
    _comments: true,
    _reactions: true,
    page,
    limit,
    sort: "created",
    sortOrder,
  });

  const response = await fetch(`${API_BASE_URL}/social/posts?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch posts.");
  }

  let posts = await response.json();

  if (filterImages) {
    posts.data = posts.data.filter((post) => post.media?.url);
  }

  return posts;
};