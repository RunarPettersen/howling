import { fetchSearchResults } from "../utils/api/fetchSearchResults.js";
import { renderPost } from "../feed/renderPost.js";
import { loadHeader } from "../utils/loadHeader.js";

loadHeader();

const resultsContainer = document.getElementById("resultsContainer");

const params = new URLSearchParams(window.location.search);
const query = params.get("query");

if (query) {
  document.title = `Search Results for "${query}"`;

  fetchSearchResults(query)
    .then((results) => {
      if (results.length > 0) {
        resultsContainer.innerHTML = "";
        results.forEach((post) => renderPost(post, resultsContainer));
      } else {
        resultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching search results:", error.message);
      resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    });
} else {
  resultsContainer.innerHTML = "<p>No search query provided.</p>";
}