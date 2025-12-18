export const createFilterUI = (onFilterChange) => {
  const filterContainer = document.createElement("div");
  filterContainer.className = "space-y-4 max-w-[800px] w-full mx-auto px-4";

  // Sort order dropdown
  const sortSelect = document.createElement("select");
  sortSelect.className = "px-3 py-2 rounded-md bg-white text-black shadow border border-gray-300";
  sortSelect.innerHTML = `
    <option value="desc" selected>Newest First</option>
    <option value="asc">Oldest First</option>
  `;
  sortSelect.addEventListener("change", () => {
    onFilterChange({ sortOrder: sortSelect.value });
  });

  // Image filter toggle
  const imageToggle = document.createElement("label");
  imageToggle.className = "inline-flex items-center gap-2 text-sm pl-2";

  const imageCheckbox = document.createElement("input");
  imageCheckbox.type = "checkbox";
  imageCheckbox.id = "filterImages";
  imageCheckbox.className = "w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary";
  imageCheckbox.addEventListener("change", () => {
    onFilterChange({ filterImages: imageCheckbox.checked });
  });

  const labelText = document.createTextNode("Hide posts without images");

  imageToggle.appendChild(imageCheckbox);
  imageToggle.appendChild(labelText);

  filterContainer.appendChild(sortSelect);
  filterContainer.appendChild(imageToggle);

  return filterContainer;
};