import { getAuthToken, getApiKey } from "../utils/api/helpers.js";

const API_BASE_URL = "https://v2.api.noroff.dev";

/**
 * Updates the user's bio, avatar, or banner
 */
const updateUserProfile = async (updatedData) => {
  try {
    const token = getAuthToken();
    const apiKey = getApiKey();
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedInUser || !loggedInUser.name) {
      throw new Error("User not found. Please log in again.");
    }

    const response = await fetch(`${API_BASE_URL}/social/profiles/${loggedInUser.name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update user profile.");
    }

    const updatedUser = await response.json();

    localStorage.setItem("user", JSON.stringify(updatedUser.data));

    alert("Profile updated successfully!");
    location.reload();
  } catch (error) {
    console.error("Error updating profile:", error.message);
    alert(`Error updating profile: ${error.message}`);
  }
};

/**
 * Handles form submission for editing user profile
 */
const editUserForm = document.getElementById("editUserForm");

if (editUserForm) {
  editUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newBio = document.getElementById("newBio").value.trim();
    const newAvatarUrl = document.getElementById("newAvatarUrl").value.trim();
    const newBannerUrl = document.getElementById("newBannerUrl").value.trim();

    if (!newBio && !newAvatarUrl && !newBannerUrl) {
      alert("Please enter at least one field to update.");
      return;
    }

    const updatedData = {};
    if (newBio) updatedData.bio = newBio;
    if (newAvatarUrl) updatedData.avatar = { url: newAvatarUrl, alt: "User Avatar" };
    if (newBannerUrl) updatedData.banner = { url: newBannerUrl, alt: "User Banner" };

    await updateUserProfile(updatedData);
  });
}