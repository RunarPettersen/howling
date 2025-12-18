import { loadHeader } from "../utils/loadHeader.js";

loadHeader();

const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("You must be logged in to view your profile.");
  window.location.href = "./login.html";
} else {
  const bannerElement = document.getElementById("userBanner");
  const avatarElement = document.getElementById("userAvatar");
  const nameElement = document.getElementById("userName");
  const emailElement = document.getElementById("userEmail");
  const bioElement = document.getElementById("userBio");

  if (bannerElement) bannerElement.src = user.banner?.url || "../images/default-banner.jpg";
  if (avatarElement) avatarElement.src = user.avatar?.url || "../images/default-avatar.png";
  if (nameElement) nameElement.textContent = user.name;
  if (emailElement) emailElement.textContent = user.email;
  if (bioElement) bioElement.textContent = user.bio ? `${user.bio}` : "Bio: No bio available";
}