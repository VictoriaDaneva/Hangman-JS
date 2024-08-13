import { words } from "./wordList.js";
import { html, render } from "./lip.js";

let currentWord = "";
let guessedLetters = [];
let incorrectGuesses = 0;

// Get references to DOM elements
const keyboardContainer = document.querySelector(".alphabet");
const lettersContainer = document.querySelector(".word-display");
const hangmanContainer = document.getElementById("hangman-images-container");

// Template for rendering a single letter
const letterTemplate = (letter, guessed) =>
  html`<li class="letter ${guessed ? "guessed" : ""}">
    ${guessed ? letter : ""}
  </li>`;

// Function to select a random word and render its corresponding blanks
const randomWords = () => {
  const { word, hint } = words[Math.floor(Math.random() * words.length)];
  currentWord = word;

  // Update the hint in the DOM
  document.querySelector(".hint-text b").textContent = hint;

  // Render blanks for the word initially
  renderWordDisplay();
};

const renderWordDisplay = () => {
  const lettersList = currentWord
    .split("")
    .map((letter) => letterTemplate(letter, guessedLetters.includes(letter)));

  // Render the blanks (underscores) or guessed letters in the word display area
  render(html`${lettersList}`, lettersContainer);
};

function initGame(button, clickedLetter) {
  // Add the clicked letter to guessed letters
  guessedLetters.push(clickedLetter);

  if (currentWord.includes(clickedLetter)) {
    // Re-render the word with updated guessed letters
    renderWordDisplay();
  } else {
    incorrectGuesses++;
    document.querySelector(
      ".incorrect-guesses b"
    ).textContent = `${incorrectGuesses} / 6`;

    const image = document.createElement("img");
    image.src = `../style/${incorrectGuesses}Mistake.png`;
    hangmanContainer.appendChild(image);

    if (incorrectGuesses >= 6) {
      alert(`You died!!! The correct word was : ${currentWord}`);
      window.location.reload();
    }
  }
  button.disabled = true;
}

// Initialize the alphabet keyboard
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.textContent = String.fromCharCode(i);
  keyboardContainer.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}

// Call the function to display a random word when the page loads
randomWords();
