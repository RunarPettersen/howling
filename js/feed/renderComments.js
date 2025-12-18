import { addCommentToPost } from "../utils/api/comments.js";

/**
 * Render comments for a post.
 */
export const renderComments = (post, postElement) => {
  const commentsContainer = document.createElement("div");
  commentsContainer.className = "mt-4 space-y-4";

  const comments = post.comments || [];

  const commentsList = `
    <h3 class="text-lg font-semibold text-gray-800">Comments:</h3>
    <ul class="space-y-2 text-sm text-gray-700">
      ${
        comments.length
          ? comments
              .map(
                (comment) => `
          <li class="bg-gray-100 p-3 rounded-md">
            <strong class="text-primary">
              <a href="../user/profile.html?name=${
                comment.author?.name || "#"
              }" class="hover:underline">
                ${comment.author?.name || "Unknown"}
              </a>:
            </strong> ${comment.body}
          </li>
        `
              )
              .join("")
          : "<li class='text-gray-500 italic'>No comments yet.</li>"
      }
    </ul>
  `;

  const commentForm = `
    <form class="space-y-2" data-id="${post.id}">
      <textarea
        name="comment"
        rows="3"
        placeholder="Add a comment..."
        required
        class="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bg"
      ></textarea>
      <button
        type="submit"
        class="bg-primary text-white px-4 py-2 rounded hover:bg-accent transition duration-300 ease-in-out cursor-pointer"
      >
        Post Comment
      </button>
    </form>
  `;

  commentsContainer.innerHTML = commentsList + commentForm;
  postElement.appendChild(commentsContainer);

  // Add comment functionality
  commentsContainer
    .querySelector("form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const commentInput = event.target.comment;
      const commentBody = commentInput.value.trim();

      if (!commentBody) return;

      try {
        await addCommentToPost(post.id, commentBody);
        alert("Comment added successfully!");
        commentInput.value = "";
        location.reload();
      } catch (error) {
        console.error("Failed to add comment:", error.message);
      }
    });
};