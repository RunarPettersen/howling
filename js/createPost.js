import { createPost } from "./utils/api/posts.js";
import { loadHeader } from "./utils/loadHeader.js";

loadHeader();

const form = document.getElementById("postForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const postData = {
    title: form.title.value.trim(),
    body: form.body.value.trim() || null,
    tags: form.tags.value
      ? form.tags.value.split(",").map((tag) => tag.trim())
      : [],
    media: form.mediaUrl.value.trim()
      ? {
          url: form.mediaUrl.value.trim(),
          alt: form.mediaAlt.value.trim() || "Image",
        }
      : null,
  };

  try {
    const result = await createPost(postData);
    alert("Post created successfully!");
    window.location.href = "../feed.html";
  } catch (error) {
    console.error("Post creation failed:", error.message);
    alert(`Failed to create post: ${error.message}`);
  }
});