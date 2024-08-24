// Correcting selectors and handling visibility
const notificationContainer = document.querySelector(".notification");
const notificationImage = document.querySelector(".notification img");
const tryAgainButton = document.querySelector(".notification button");

tryAgainButton.addEventListener("click", hide);

export function notify(hasWin) {
  // Set the appropriate image for win or lose
  if (hasWin) {
    notificationImage.src = "../style/youWin.png";
  } else {
    notificationImage.src = "../style/youDied.png";
  }

  // Display the notification container
  notificationContainer.style.display = "flex";
}

function hide() {
  // Hide the notification and reset the game
  notificationImage.src = "";
  notificationContainer.style.display = "none";
  window.location.reload(); // This will reload the page to start a new game
}

function disableButton() {
  const button = document.getElementById("try-again-button");
  button.disabled = true; // Disable the button
  button.style.opacity = "0.5"; // Optional: visually indicate that the button is disabled
}

function enableButton() {
  const button = document.getElementById("try-again-button");
  button.disabled = false; // Enable the button
  button.style.opacity = "1"; // Optional: reset opacity
}
