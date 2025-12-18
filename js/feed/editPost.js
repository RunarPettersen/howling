import { updatePost } from "../utils/api/posts.js";

export const editPost = (post, postElement) => {
  if (postElement.querySelector(".edit-form")) return;

  const form = document.createElement("form");
  form.className = "edit-form space-y-4 p-4 border rounded-md bg-surface text-text";

  // Title
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  titleLabel.className = "block text-sm font-medium";
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.value = post.title;
  titleInput.required = true;
  titleInput.className = "bg-background w-full p-2 border rounded-md text-black";

  // Body
  const bodyLabel = document.createElement("label");
  bodyLabel.textContent = "Body:";
  bodyLabel.className = "block text-sm font-medium";
  const bodyTextarea = document.createElement("textarea");
  bodyTextarea.name = "body";
  bodyTextarea.rows = 4;
  bodyTextarea.textContent = post.body || "";
  bodyTextarea.className = "bg-background w-full p-2 border rounded-md text-black";

  // Tags
  const tagsLabel = document.createElement("label");
  tagsLabel.textContent = "Tags (comma-separated):";
  tagsLabel.className = "block text-sm font-medium";
  const tagsInput = document.createElement("input");
  tagsInput.type = "text";
  tagsInput.name = "tags";
  tagsInput.value = post.tags.join(", ");
  tagsInput.className = "bg-background w-full p-2 border rounded-md text-black";

  // Media URL
  const mediaUrlLabel = document.createElement("label");
  mediaUrlLabel.textContent = "Image URL:";
  mediaUrlLabel.className = "block text-sm font-medium";
  const mediaUrlInput = document.createElement("input");
  mediaUrlInput.type = "text";
  mediaUrlInput.name = "mediaUrl";
  mediaUrlInput.value = post.media?.url || "";
  mediaUrlInput.placeholder = "Enter image URL";
  mediaUrlInput.className = "bg-background w-full p-2 border rounded-md text-black";

  // Alt Text
  const mediaAltLabel = document.createElement("label");
  mediaAltLabel.textContent = "Alt Text:";
  mediaAltLabel.className = "block text-sm font-medium";
  const mediaAltInput = document.createElement("input");
  mediaAltInput.type = "text";
  mediaAltInput.name = "mediaAlt";
  mediaAltInput.value = post.media?.alt || "";
  mediaAltInput.placeholder = "Enter alt text";
  mediaAltInput.className = "bg-background w-full p-2 border rounded-md text-black";

  // Submit Button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Save Changes";
  submitButton.className = "bg-primary text-white px-4 py-2 rounded-md hover:bg-accent cursor-pointer transition duration-300 ease-in-out";

  // Cancel Button
  const cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.className = "ml-4 bg-gray-400 text-black px-4 py-2 rounded-md hover:bg-gray-500 cursor-pointer transition duration-300 ease-in-out";

  cancelButton.addEventListener("click", () => form.remove());

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const updatedPost = {
      title: titleInput.value.trim(),
      body: bodyTextarea.value.trim(),
      tags: tagsInput.value.split(",").map((tag) => tag.trim()),
      media: {
        url: mediaUrlInput.value.trim(),
        alt: mediaAltInput.value.trim(),
      },
    };

    try {
      await updatePost(post.id, updatedPost);
      alert("Post updated successfully!");
      location.reload();
    } catch (error) {
      console.error("Failed to update post:", error.message);
      alert(`Failed to update post: ${error.message}`);
    }
  });

  form.append(
    titleLabel, titleInput,
    bodyLabel, bodyTextarea,
    tagsLabel, tagsInput,
    mediaUrlLabel, mediaUrlInput,
    mediaAltLabel, mediaAltInput,
    submitButton, cancelButton
  );

  postElement.appendChild(form);
};