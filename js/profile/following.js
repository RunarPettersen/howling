import { fetchProfile, unfollowProfile } from "../utils/api/profiles.js";
import { loadHeader } from "../utils/loadHeader.js";

loadHeader();

const followingList = document.getElementById("followingList");
const followersList = document.getElementById("followersList");

// Function to handle unfollowing a user
const handleUnfollow = async (userName) => {
  if (confirm(`Are you sure you want to unfollow ${userName}?`)) {
    try {
      await unfollowProfile(userName);
      alert(`You have unfollowed ${userName}.`);
      loadConnections();
    } catch (error) {
      console.error("Failed to unfollow user:", error.message);
      alert(`Error: Could not unfollow ${userName}.`);
    }
  }
};

// Fetch and display following and followers
const loadConnections = async () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) {
    alert("You must be logged in to view this page.");
    window.location.href = "../user/login.html";
    return;
  }

  try {
    const profile = await fetchProfile(loggedInUser.name, { followers: true, following: true });

    // Following list
    followingList.innerHTML = profile.following.length
      ? profile.following
          .map(
            (user) => `
              <li class="flex items-center justify-between gap-4 p-3 bg-white shadow rounded-md">
                <a href="../user/profile.html?name=${user.name}" class="flex items-center gap-3">
                  <img src="${user.avatar?.url || "../images/default-avatar.png"}"
                       alt="${user.avatar?.alt || "User Avatar"}"
                       class="w-10 h-10 rounded-full object-cover" />
                  <span class="font-medium text-gray-900">${user.name}</span>
                </a>
                <button class="unfollow-btn text-sm bg-primary text-white px-3 py-1 rounded hover:bg-accent transition duration-300 ease-in-out cursor-pointer"
                        data-name="${user.name}">
                  Unfollow
                </button>
              </li>
            `
          )
          .join("")
      : `<li class="text-gray-600 italic">You are not following anyone yet.</li>`;

    document.querySelectorAll(".unfollow-btn").forEach((button) => {
      button.addEventListener("click", () => handleUnfollow(button.dataset.name));
    });

    // Followers list
    followersList.innerHTML = profile.followers.length
      ? profile.followers
          .map(
            (user) => `
              <li class="flex items-center gap-4 p-3 bg-white shadow rounded-md">
                <a href="../user/profile.html?name=${user.name}" class="flex items-center gap-3">
                  <img src="${user.avatar?.url || "../images/default-avatar.png"}"
                       alt="${user.avatar?.alt || "User Avatar"}"
                       class="w-10 h-10 rounded-full object-cover" />
                  <span class="font-medium text-gray-900">${user.name}</span>
                </a>
              </li>
            `
          )
          .join("")
      : `<li class="text-gray-600 italic">No one is following you yet.</li>`;
  } catch (error) {
    console.error("Failed to load connections:", error.message);
    alert(`Error loading connections: ${error.message}`);
  }
};

loadConnections();