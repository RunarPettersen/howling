import { followProfile, unfollowProfile } from "../utils/api/profiles.js";

export const updateFollowButton = (profile, followBtn, loadProfile) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (!loggedInUser) {
    console.error("No logged-in user found.");
    followBtn.style.display = "none";
    return;
  }

  const followers = profile.followers || [];

  try {
    const isFollowing = followers.some((follower) => {
      return follower?.name === loggedInUser?.name;
    });

    followBtn.textContent = isFollowing ? "Unfollow" : "Follow";
    followBtn.onclick = async () => {
      try {
        if (isFollowing) {
          await unfollowProfile(profile.name);
          alert(`Unfollowed ${profile.name}`);
        } else {
          await followProfile(profile.name);
          alert(`Followed ${profile.name}`);
        }
        await loadProfile(profile.name);
      } catch (error) {
        console.error("Failed to toggle follow:", error.message);
        alert(`Failed to toggle follow: ${error.message}`);
      }
    };
  } catch (error) {
    console.error("Error in processing followers:", error.message);
  }
};