import { deletePostById } from "../utils/api/posts.js";

export const deletePost = async (postId) => {
  if (!confirm("Are you sure you want to delete this post?")) return;

  try {
    await deletePostById(postId);
    alert("Post deleted successfully!");
    location.reload();
  } catch (error) {
    console.error("Failed to delete post:", error.message);
    alert(`Failed to delete post: ${error.message}`);
  }
};
