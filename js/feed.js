import { loadFeed } from "./feed/loadFeed.js";
import { loadHeader } from "./utils/loadHeader.js";

loadHeader();

const feedContainer = document.getElementById("feedContainer");

loadFeed(feedContainer);