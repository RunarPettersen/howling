import { loginUser } from "./utils/api/auth.js";
import { loadHeader } from "./utils/loadHeader.js";

loadHeader();

const form = document.getElementById("loginForm");
const messageEl = document.getElementById("loginMessage");
const loginBtn = document.getElementById("loginBtn");

function showMessage(text, type = "error") {
  if (!messageEl) return;

  messageEl.textContent = text;
  messageEl.classList.remove("hidden");

  if (type === "success") {
    messageEl.className =
      "rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800";
    messageEl.setAttribute("role", "status");
    messageEl.setAttribute("aria-live", "polite");
    return;
  }

  // default: error
  messageEl.className =
    "rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800";
  messageEl.setAttribute("role", "alert");
  messageEl.setAttribute("aria-live", "polite");
}

function hideMessage() {
  if (!messageEl) return;
  messageEl.textContent = "";
  messageEl.classList.add("hidden");
}

function setLoading(isLoading) {
  if (!loginBtn) return;
  loginBtn.disabled = isLoading;
  loginBtn.classList.toggle("opacity-60", isLoading);
  loginBtn.classList.toggle("cursor-not-allowed", isLoading);
  loginBtn.textContent = isLoading ? "Logging in..." : "Login";
}

function getLoginErrorMessage(error) {
  const msg = (error?.message || "").toLowerCase();

  if (msg.includes("invalid") || msg.includes("unauthorized") || msg.includes("401")) {
    return "Incorrect email or password. Please try again.";
  }

  if (msg.includes("network") || msg.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }

  return "Login failed. Please try again.";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRedirectTarget() {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get("redirect");

  // Basic safety: only allow relative redirects
  if (redirect && redirect.startsWith("/")) return redirect;
  if (redirect && redirect.startsWith("./")) return redirect;
  if (redirect && redirect.startsWith("../")) return redirect;

  return "/feed.html";
}

/* Show a friendly message if user was redirected here */
(function showLoginReasonMessage() {
  const params = new URLSearchParams(window.location.search);
  const reason = params.get("reason");

  if (reason === "login_required") {
    showMessage("Please log in to continue.", "error");
  }
})();

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  hideMessage();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const email = emailInput?.value?.trim() || "";
  const password = passwordInput?.value?.trim() || "";

  if (!email || !password) {
    showMessage("Please enter both email and password.", "error");
    return;
  }

  try {
    setLoading(true);

    await loginUser({ email, password });

    showMessage("Login successful! Redirecting…", "success");
    await sleep(900);

    window.location.href = getRedirectTarget();
  } catch (error) {
    console.error("Login failed:", error);
    showMessage(getLoginErrorMessage(error), "error");
  } finally {
    setLoading(false);
  }
});