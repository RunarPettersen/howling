import { renderReactions } from "./renderReactions.js";
import { renderComments } from "./renderComments.js";
import { editPost } from "./editPost.js";
import { deletePost } from "./deletePost.js";
import { formatDate } from "../utils/formatDate.js";

export const renderPost = (post, feedContainer, profileName = null) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // Post container
  const postElement = document.createElement("div");
  postElement.className = "bg-white rounded-lg shadow-md p-4 space-y-4";

  const authorName = profileName || post.author?.name || "Unknown";
  const isOwner = authorName === loggedInUser?.name;

  // Meta (author + date)
  const metaContainer = document.createElement("div");
  metaContainer.className = "flex justify-between items-center text-sm text-gray-500";

  const authorLink = document.createElement("a");
  authorLink.href = `../user/profile.html?name=${authorName}`;
  authorLink.textContent = authorName;
  authorLink.className = "hover:underline font-medium text-primary";

  const postDate = document.createElement("p");
  postDate.textContent = formatDate(post.created);
  postDate.className = "text-gray-400";

  metaContainer.appendChild(authorLink);
  metaContainer.appendChild(postDate);

  // Title
  const postTitle = document.createElement("h2");
  postTitle.className = "text-xl font-bold text-gray-900";

  const titleLink = document.createElement("a");
  titleLink.href = `../post/post.html?id=${post.id}`;
  titleLink.textContent = post.title;
  titleLink.className = "hover:underline";

  postTitle.appendChild(titleLink);

  // Body
  const postBody = document.createElement("p");
  postBody.textContent = post.body || "";
  postBody.className = "text-gray-700";

  // Tags
  const tagsContainer = document.createElement("div");
  tagsContainer.className = "text-sm text-gray-500 italic";

  const tagsText = document.createElement("p");
  tagsText.textContent = `Tags: ${post.tags?.length ? post.tags.join(", ") : "none"}`;
  tagsContainer.appendChild(tagsText);

  // Media
  let postMedia = null;
  if (post.media?.url) {
    postMedia = document.createElement("img");
    postMedia.src = post.media.url;
    postMedia.alt = post.media.alt || "Post image";
    postMedia.className = "w-full rounded-md object-cover max-h-180";
  }

  // Stats (comments/reactions)
  const statsContainer = document.createElement("div");
  statsContainer.className = "flex gap-4 text-sm text-gray-500";

  const commentsCount = document.createElement("p");
  commentsCount.textContent = `Comments: ${post._count?.comments || 0}`;

  const reactionsCount = document.createElement("p");
  reactionsCount.textContent = `Reactions: ${post._count?.reactions || 0}`;

  statsContainer.appendChild(commentsCount);
  statsContainer.appendChild(reactionsCount);

  // Owner Actions
  const actionsContainer = document.createElement("div");
  actionsContainer.className = "flex gap-2 mt-4";

  if (isOwner) {
    const editButton = document.createElement("button");
    editButton.className = "px-3 py-1 bg-primary text-white rounded hover:bg-accent transition duration-300 ease-in-out cursor-pointer";
    editButton.dataset.id = post.id;
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editPost(post, postElement));

    const deleteButton = document.createElement("button");
    deleteButton.className = "px-3 py-1 bg-primary text-white rounded hover:bg-accent transition duration-300 ease-in-out cursor-pointer";
    deleteButton.dataset.id = post.id;
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deletePost(post.id));

    actionsContainer.appendChild(editButton);
    actionsContainer.appendChild(deleteButton);
  }

  // Assemble post
  postElement.appendChild(metaContainer);
  postElement.appendChild(postTitle);
  postElement.appendChild(postBody);
  postElement.appendChild(tagsContainer);
  if (postMedia) postElement.appendChild(postMedia);
  postElement.appendChild(statsContainer);
  postElement.appendChild(actionsContainer);

  feedContainer.appendChild(postElement);

  // Add reactions/comments
  renderReactions(post, postElement);
  renderComments(post, postElement);
};