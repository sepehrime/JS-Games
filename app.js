const MAX_ATTEMPTS = 5;
let secret;
let attempts;
// console.log(secret);
const msg = document.getElementById("message");
const guessBtn = document.getElementById("btn");
const input = document.getElementById("guess");
const reset = document.getElementById("playAgain");
msg.textContent = `Press 'Play' button to start`;
guessBtn.disabled = true;
input.disabled = true;

function resetGame() {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = MAX_ATTEMPTS;
  guessBtn.disabled = false;
  msg.textContent = `I'm thinking of a number between [1,100]. You have ${attempts} chances to guess it!`;
  reset.disabled = true;
  input.disabled = false;
  input.focus();
}
function endGame(message) {
  msg.textContent = message;
  guessBtn.disabled = true;
  reset.disabled = false;
  input.disabled = true;
  reset.focus();
}
reset.addEventListener("click", resetGame);
guessBtn.addEventListener("click", () => {
  const guess = Number(input.value);
  if (!Number.isInteger(guess) || guess > 100 || guess < 1) {
    msg.textContent = `Please enter an integer between 1 and 100`;
    return;
  }
  attempts--;
  if (guess === secret) {
    endGame(`🥳 You guessed it right in ${MAX_ATTEMPTS - attempts} tries!`);
  } else if (attempts === 0) {
    endGame(`Sorry, you ran out of chance! The number was ${secret}`);
  } else {
    const hint = guess > secret ? "too high" : "too low";
    const word = attempts === 1 ? "chance" : "chances";
    msg.textContent = `😩 Sorry, ${hint}! Try again. You have ${attempts} more ${word}!`;
  }
  input.value = "";
  input.focus();
});

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    guessBtn.click();
  }
});
