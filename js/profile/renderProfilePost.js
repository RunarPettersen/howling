import { renderReactions } from "../feed/renderReactions.js";
import { renderComments } from "../feed/renderComments.js";
import { editPost } from "../feed/editPost.js";
import { deletePost } from "../feed/deletePost.js";
import { formatDate } from "../utils/formatDate.js";

export const renderProfilePost = (post, container) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const postElement = document.createElement("div");
  postElement.classList.add("profile-post");

  const isOwner = post.author?.name === loggedInUser?.name;

  postElement.innerHTML = `
  <h2><a href="../post/post.html?id=${post.id}">${post.title}</a></h2>
  <p>${post.body || "No content available"}</p>
  <img src="${post.media?.url || "../images/avatar-placeholder.png"}" alt="${post.media?.alt || "Default placeholder image"}">
  <p>Tags: ${post.tags?.length ? post.tags.join(", ") : "No tags"}</p>
  <div class="author">
    <p>Posted by: <a href="../user/profile.html?name=${post.author?.name || "Unknown"}">${post.author?.name || "Unknown"}</a></p>
    <p>Posted on: ${formatDate(post.created)}</p>
  </div>
  <div class="meta">
    <p>Comments: ${post._count?.comments || 0}</p>
    <p>Reactions: ${post._count?.reactions || 0}</p>
  </div>
  <div class="actions">
    ${isOwner ? `
      <button class="edit-btn" data-id="${post.id}">Edit</button>
      <button class="delete-btn" data-id="${post.id}">Delete</button>
    ` : ""}
  </div>
  <div id="reactions-${post.id}" class="reactions"></div>
  <div id="comments-${post.id}" class="comments"></div>
`;

  container.appendChild(postElement);

  if (isOwner) {
    postElement.querySelector(".edit-btn").addEventListener("click", () => editPost(post, postElement));
    postElement.querySelector(".delete-btn").addEventListener("click", () => deletePost(post.id));
  }

  const reactionsContainer = postElement.querySelector(`#reactions-${post.id}`);
  renderReactions(post.reactions || [], reactionsContainer);

  const commentsContainer = postElement.querySelector(`#comments-${post.id}`);
  renderComments(post.comments || [], commentsContainer);
};