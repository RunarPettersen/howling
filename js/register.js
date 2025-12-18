import { registerUser } from "./utils/api/auth.js";
import { loadHeader } from "./utils/loadHeader.js";

loadHeader();

const form = document.getElementById("registerForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userData = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value.trim(),
  };

  if (form.bio?.value.trim()) {
    userData.bio = form.bio.value.trim();
  }

  if (form.avatarUrl?.value.trim()) {
    userData.avatar = {
      url: form.avatarUrl.value.trim(),
      alt: form.avatarAlt?.value.trim() || "",
    };
  }

  if (form.bannerUrl?.value.trim()) {
    userData.banner = {
      url: form.bannerUrl.value.trim(),
      alt: form.bannerAlt?.value.trim() || "",
    };
  }

  // Validation checks
  if (!/^[a-zA-Z0-9_]+$/.test(userData.name)) {
    alert("Username can only contain letters, numbers, and underscores (_).");
    return;
  }

  if (!userData.email.endsWith("@stud.noroff.no")) {
    alert("Email must be a valid @stud.noroff.no address.");
    return;
  }

  if (userData.password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  try {
    const result = await registerUser(userData);
    alert("Registration successful! Please log in.");
    window.location.href = "./login.html";
  } catch (error) {
    console.error("Registration failed:", error);

    try {
      const errorResponse = await error.json();
      console.error("Full API Error Response:", errorResponse);
      alert(`Registration failed: ${errorResponse.errors?.map(e => e.message).join(", ") || errorResponse.message || "Unknown error."}`);
    } catch (jsonError) {
      alert(`Registration failed: ${error.message}`);
    }
  }
});