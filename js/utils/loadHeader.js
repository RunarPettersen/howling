import { initHamburgerToggle } from "./hamburgerToggle.js";

export async function loadHeader() {
  const container = document.getElementById("site-header");
  if (!container) return;

  try {
    const res = await fetch("/partials/header.html");
    let html = await res.text();

    // Count how deep we are (e.g. /post/ or /user/)
    const depth = location.pathname.split("/").filter(Boolean).length;

    // Build a relative prefix like "../" or "./"
    const prefix = depth > 1 ? "../" : "./";

    // Replace all absolute paths with dynamic prefix
    html = html
      .replaceAll('href="/', `href="${prefix}`)
      .replaceAll('src="/', `src="${prefix}`)
      .replaceAll('action="/', `action="${prefix}`);

    container.innerHTML = html;

    // Init hamburger after header is in DOM
    initHamburgerToggle("#hamburgerButton", "#mobileMenu");
  } catch (error) {
    console.error("Failed to load header:", error);
  }
}