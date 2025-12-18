import { getAuthToken, getApiKey } from "../../utils/api/helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Fetch search results for a query.
 */
export const fetchSearchResults = async (query) => {
  const token = getAuthToken();
  const apiKey = getApiKey();

  const response = await fetch(
    `${API_BASE_URL}/social/posts/search?q=${encodeURIComponent(query)}&_author=true&_reactions=true&_comments=true`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch search results.");
  }

  const data = await response.json();
  return data.data;
};