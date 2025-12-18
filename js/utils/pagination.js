export const createPaginationControls = (meta, onPageChange) => {
  const { isFirstPage, isLastPage, currentPage } = meta;

  const paginationDiv = document.createElement("div");
  paginationDiv.className = "flex items-center justify-center gap-4 mt-6";

  paginationDiv.innerHTML = `
    <button 
      class="prev-page px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      ${isFirstPage ? "disabled" : ""}
    >
      Previous
    </button>
    <span class="text-sm text-gray-600">Page ${currentPage}</span>
    <button 
      class="next-page px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      ${isLastPage ? "disabled" : ""}
    >
      Next
    </button>
  `;

  paginationDiv.querySelector(".prev-page").addEventListener("click", () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  paginationDiv.querySelector(".next-page").addEventListener("click", () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  return paginationDiv;
};