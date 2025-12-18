import { toggleReaction } from "../utils/api/reactions.js";

/**
 * Render reactions for a post.
 */
export const renderReactions = (post, postElement) => {
  const reactionsContainer = document.createElement("div");
  reactionsContainer.className = "flex gap-2 flex-wrap mt-2";

  const reactions = post.reactions || [];
  const reactionSymbols = ["👍", "❤️", "😂", "🤘", "💀"];

  reactionSymbols.forEach((symbol) => {
    const reaction = reactions.find((r) => r.symbol === symbol);
    const count = reaction ? reaction.count : 0;
    const reactors = reaction?.reactors || [];

    const button = document.createElement("button");
    button.className =
      "relative px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-sm transition duration-200 cursor-pointer";
    button.dataset.symbol = symbol;
    button.innerHTML = `${symbol} ${count}`;

    // Tooltip
    const tooltip = document.createElement("span");
    tooltip.className =
      "absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 pointer-events-none transition-opacity duration-200 z-10 whitespace-nowrap";
    tooltip.textContent = reactors.length
      ? `Reacted by: ${reactors.join(", ")}`
      : "No reactions yet";

    button.appendChild(tooltip);

    // Show/hide tooltip
    button.addEventListener("mouseover", () => {
      tooltip.classList.remove("opacity-0", "pointer-events-none");
    });

    button.addEventListener("mouseout", () => {
      tooltip.classList.add("opacity-0", "pointer-events-none");
    });

    // Toggle reaction on click
    button.addEventListener("click", async () => {
      try {
        const updatedReactions = await toggleReaction(post.id, symbol);
        const updatedReaction = updatedReactions.data.reactions.find(
          (r) => r.symbol === symbol
        );

        button.innerHTML = `${symbol} ${updatedReaction ? updatedReaction.count : 0}`;
        tooltip.textContent = updatedReaction?.reactors.length
          ? `Reacted by: ${updatedReaction.reactors.join(", ")}`
          : "No reactions yet";

        button.appendChild(tooltip); // re-append in case it got removed
      } catch (error) {
        console.error("Failed to toggle reaction:", error.message);
      }
    });

    reactionsContainer.appendChild(button);
  });

  postElement.appendChild(reactionsContainer);
};