// This section working with DOM. So when all code communicate with each other from different files index.html, index.js
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses");
const correctMessage = document.getElementById("correct");
const errorMessage = document.getElementById("error"); // I have added errorMessage element

// Here is declarataion variables, Game state variables
let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5; //  this variable needs to be mutable, changed const to "let"

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11

// Generates a random number between min and max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function checking user guess

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10); // Converting to integer

  //Checking if guess is with valid range
  if (guess < 1 || guess > 99 || isNaN(guess)) {
    errorMessage.style.display = "";
    errorMessage.innerHTML = "Please enter a number between 1 and 99";
    return;
  }

  attempts = attempts + 1;

  hideAllMessages();
  // Cheking if the guess is correct
  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  // Checking if the guess is wrong
  else {
    // Check if the guess is too low or too high
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = ""; // Corrected from 'tooLowMessage' to 'tooHighMessage'
    }
    /*if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = ''; // changed tooLowMessage to 'toHighMessage'
    }*/
    // Calculate remaining attempts
    const remainingAttempts = maxNumberOfAttempts - attempts;
    // Showing the guess and remaining attempts
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }
  // Checking if the user has reached the maximum number of attempts
  if (attempts === maxNumberOfAttempts) {
    // removed extra '='
    submitButton.disabled = true;
    guessInput.disabled = true;
  }
  // Clearing the input field
  guessInput.value = "";

  resetButton.style.display = "";
}
// This function hides all the message elements.
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    // fixed indexing sequence
    messages[elementIndex].style.display = "none";
  }
}
// Sets up the game. Initializing variables, enabling inputs, and hiding messages.
function setup() {
  // function keyword was misspelled
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  //maxNumberOfAttempts = 5; // variabile should reset to five
  attempts = 0; // Attempts variable should be reset to 0 when the game is reset
  // Enable the input and submit button
  submitButton.disabled = false; // Fixed spelling of the 'disabled'
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}
// Event listeners for the submit and reset buttons
submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);
// Setting up the game initially
setup();
