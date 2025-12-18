import { getAuthToken, getApiKey } from "../utils/api/helpers.js";
import { renderPost } from "../feed/renderPost.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

// Fetch posts from followed users
const fetchFollowingPosts = async () => {
  const token = getAuthToken();
  const apiKey = getApiKey();

  const response = await fetch(`${API_BASE_URL}/social/posts/following?_author=true&_reactions=true&_comments=true`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch posts from followed users.");
  }

  const data = await response.json();
  return data.data;
};

// Render following posts
const loadFollowingPosts = async () => {
  try {
    const followingPosts = await fetchFollowingPosts();

    const feedContainer = document.getElementById("feedContainer");

    feedContainer.innerHTML = "";

    if (Array.isArray(followingPosts) && followingPosts.length > 0) {
      followingPosts.forEach((post) => {
        try {
          renderPost(post, feedContainer);
        } catch (error) {
          console.error("Error rendering post:", error.message);
        }
      });
    } else {
      feedContainer.innerHTML = "<p>No posts available from followed users.</p>";
    }
  } catch (error) {
    console.error("Error loading following posts:", error.message);

    const feedContainer = document.getElementById("feedContainer");
    feedContainer.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
  }
};

loadFollowingPosts();