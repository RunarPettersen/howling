import { fetchProfile } from "../utils/api/profiles.js";
import { updateFollowButton } from "./updateFollowButton.js";
import { renderReactions } from "../feed/renderReactions.js";
import { renderComments } from "../feed/renderComments.js";
import { formatDate } from "../utils/formatDate.js";
import { loadHeader } from "../utils/loadHeader.js";

loadHeader();

const profileHeader = document.getElementById("profileHeader");
const postsContainer = document.getElementById("postsContainer");
const followBtn = document.getElementById("followBtn");

// Function to load and render the profile
const loadProfile = async (profileName) => {
  try {
    const profile = await fetchProfile(profileName);

    // Populate profile header
    document.getElementById("profileBanner").src = profile.banner?.url || "../images/default-banner.jpg";
    document.getElementById("profileBanner").alt = profile.banner?.alt || "User Banner";
    document.getElementById("avatar").src = profile.avatar?.url || "../images/default-avatar.png";
    document.getElementById("profileName").textContent = profile.name || "Unknown User";
    document.getElementById("profileBio").textContent = profile.bio || "No bio available";

    updateFollowButton(profile, followBtn, loadProfile);

    // Render posts
    postsContainer.innerHTML = "";
    if (profile.posts?.length > 0) {
      profile.posts.forEach((post) => {
        const postElement = document.createElement("article");
        postElement.className = "bg-white p-5 rounded-lg shadow-md space-y-4";
    
        postElement.innerHTML = `
          <h2 class="text-xl font-bold text-primary hover:underline">
            <a href="../post/post.html?id=${post.id}">${post.title}</a>
          </h2>
          <p class="text-gray-800">${post.body || "No content available"}</p>
          ${
            post.media?.url
              ? `<img src="${post.media.url}" alt="${post.media.alt || "Post image"}" class="w-full rounded-md object-cover" />`
              : ""
          }
          <p class="text-sm text-gray-600"><strong>Tags:</strong> ${post.tags?.length ? post.tags.join(", ") : "No tags"}</p>
          <div class="text-sm text-gray-500">
            <p><strong>Posted by:</strong> ${post.author?.name || "Unknown"}</p>
            <p><strong>Date:</strong> ${formatDate(post.created)}</p>
            <p><strong>Comments:</strong> ${post._count?.comments || 0} | <strong>Reactions:</strong> ${post._count?.reactions || 0}</p>
          </div>
        `;
    
        postsContainer.appendChild(postElement);
    
        renderReactions(post, postElement);
        renderComments(post, postElement);
      });
    } else {
      postsContainer.innerHTML = `<p class="text-gray-500 italic">No posts available.</p>`;
    }
  } catch (error) {
    console.error("Failed to load profile:", error.message);
    profileHeader.innerHTML = `<p>Error loading profile: ${error.message}</p>`;
  }
};

// Extract profile name from URL query parameters
const params = new URLSearchParams(window.location.search);
const profileName = params.get("name");

// Load profile or show error message
if (profileName) {
  loadProfile(profileName);
} else {
  profileHeader.innerHTML = "<p>Profile not specified in the URL.</p>";
}