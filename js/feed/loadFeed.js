import { fetchPosts } from "../utils/api/posts/fetchPosts.js";
import { renderPost } from "./renderPost.js";
import { createPaginationControls } from "../utils/pagination.js";
import { createFilterUI } from "./filterFeed.js";

function isAuthError(message = "") {
  const msg = message.toLowerCase();
  return (
    msg.includes("authentication token is missing") ||
    msg.includes("token is missing") ||
    msg.includes("unauthorized") ||
    msg.includes("401") ||
    msg.includes("jwt") ||
    msg.includes("forbidden")
  );
}

const LOGIN_PATH = "/user/login.html";

function redirectToLogin(reason = "login_required") {
  const current = window.location.pathname + window.location.search;

  const url = new URL(LOGIN_PATH, window.location.origin);
  url.searchParams.set("redirect", current);
  url.searchParams.set("reason", reason);

  window.location.assign(url.toString());
}

export const loadFeed = async (feedContainer) => {
  let currentPage = 1;
  const postsPerPage = 20;
  let sortOrder = "desc";
  let filterImages = false;

  const renderFeed = async (page) => {
    try {
      const { data: posts, meta } = await fetchPosts(page, postsPerPage, sortOrder, filterImages);

      feedContainer.innerHTML = "";

      if (posts.length === 0) {
        feedContainer.innerHTML = "<p>No posts available.</p>";
        return;
      }

      posts.forEach((post) => renderPost(post, feedContainer));

      const existingPagination = document.getElementById("paginationControls");
      if (existingPagination) existingPagination.remove();

      const paginationContainer = document.createElement("div");
      paginationContainer.id = "paginationControls";

      const paginationControls = createPaginationControls(meta, (newPage) => {
        currentPage = newPage;
        renderFeed(currentPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      paginationContainer.appendChild(paginationControls);
      feedContainer.appendChild(paginationContainer);
    } catch (error) {
      console.error("Failed to load feed:", error);

      // Redirect instead of showing technical auth error
      if (isAuthError(error?.message)) {
        redirectToLogin("login_required");
        return;
      }

      feedContainer.innerHTML = `<p>Error loading feed. Please try again.</p>`;
    }
  };

  const filterContainer = createFilterUI(({ sortOrder: newSortOrder, filterImages: newFilterImages }) => {
    if (newSortOrder !== undefined) {
      sortOrder = newSortOrder;
      renderFeed(1);
    }
    if (newFilterImages !== undefined) {
      filterImages = newFilterImages;
      renderFeed(currentPage);
    }
  });

  feedContainer.parentElement.insertBefore(filterContainer, feedContainer);

  renderFeed(currentPage);
};