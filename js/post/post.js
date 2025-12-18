import { fetchPostById } from "../utils/api/fetchPostById.js";
import { renderReactions } from "../feed/renderReactions.js";
import { renderComments } from "../feed/renderComments.js";
import { formatDate } from "../utils/formatDate.js";
import { loadHeader } from "../utils/loadHeader.js";

loadHeader();

const postContainer = document.getElementById("postContainer");

const loadPost = async () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");

  if (!postId) {
    postContainer.innerHTML = "<p class='text-red-500'>Post not found.</p>";
    return;
  }

  try {
    const post = await fetchPostById(postId);

    if (!post || !post.title) {
      postContainer.innerHTML = "<p class='text-red-500'>Error: Post data not available.</p>";
      return;
    }

    const imageUrl = post.media?.url || "../images/avatar-placeholder.png";
    const imageAlt = post.media?.alt || "Default placeholder image";

    // Render post details with Tailwind classes
    postContainer.innerHTML = `
      <article class="bg-white shadow-md rounded-xl p-6 space-y-4 text-black max-w-3xl mx-auto mt-8">
        <h1 class="text-3xl font-bold">${post.title || "Untitled Post"}</h1>
        <p class="text-gray-700">${post.body || "No content available"}</p>
        
        <img src="${imageUrl}" alt="${imageAlt}" class="w-full h-auto rounded-md border border-gray-300" />

        <p class="text-sm text-gray-600">
          <strong>Tags:</strong> ${post.tags?.length ? post.tags.join(", ") : "No tags"}
        </p>

        <div class="text-sm text-gray-600">
          <p>
            <strong>Posted by:</strong> 
            <a href="../user/profile.html?name=${post.author?.name || "Unknown"}" class="text-primary hover:underline">
              ${post.author?.name || "Unknown"}
            </a>
          </p>
          <p><strong>Posted on:</strong> ${formatDate(post.created)}</p>
        </div>

        <div class="flex gap-6 text-sm text-gray-700">
          <p><strong>Comments:</strong> ${post._count?.comments || 0}</p>
          <p><strong>Reactions:</strong> ${post._count?.reactions || 0}</p>
        </div>

        <div id="reactionsContainer" class="pt-4 border-t border-gray-200"></div>
        <div id="commentsContainer" class="pt-4"></div>
      </article>
    `;

    // Render reactions
    const reactionsContainer = document.getElementById("reactionsContainer");
    if (reactionsContainer) {
      renderReactions(post, reactionsContainer);
    }

    // Render comments
    const commentsContainer = document.getElementById("commentsContainer");
    if (commentsContainer) {
      renderComments(post, commentsContainer);
    }

  } catch (error) {
    console.error("Failed to load post:", error.message);
    postContainer.innerHTML = `<p class='text-red-500'>Error loading post: ${error.message}</p>`;
  }
};

loadPost();