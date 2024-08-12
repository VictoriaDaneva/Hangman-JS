import { words } from "./wordList.js";
import { html, render } from "./lip.js";

// Get references to DOM elements
const keyboardContainer = document.querySelector(".alphabet");
const lettersContainer = document.querySelector(".word-display");

// Template for rendering a single blank letter (underscore)
const letterTemplate = () => html`<li class="letter">_</li>`;

// Function to select a random word and render its corresponding blanks
const randomWords = () => {
  // Select a random word and its hint
  const { word, hint } = words[Math.floor(Math.random() * words.length)];

  // Update the hint in the DOM
  document.querySelector(".hint-text b").textContent = hint;

  // Generate a list of blank letters based on the word length
  const lettersList = word.split("").map(() => letterTemplate());

  // Render the blanks (underscores) in the word display area
  render(html`${lettersList}`, lettersContainer);
};

// Initialize the alphabet keyboard
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.textContent = String.fromCharCode(i);
  keyboardContainer.appendChild(button);
}

// Call the function to display a random word when the page loads
randomWords();
