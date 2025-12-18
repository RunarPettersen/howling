import { fetchProfilePosts } from "../utils/api/profiles.js";
import { renderPost } from "../feed/renderPost.js";

const postsContainer = document.getElementById("userPostsContainer");

const loadUserPosts = async () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  
  if (!loggedInUser) {
    alert("You must be logged in to view your posts.");
    window.location.href = "../user/login.html";
    return;
  }

  try {
    const userPosts = await fetchProfilePosts(loggedInUser.name);

    postsContainer.innerHTML = "";

    if (!userPosts.length) {
      postsContainer.innerHTML = "<p>You haven't posted anything yet.</p>";
      return;
    }

    userPosts.forEach((post) => renderPost(post, postsContainer));

  } catch (error) {
    console.error("Failed to load user posts:", error.message);
    postsContainer.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
  }
};

loadUserPosts();