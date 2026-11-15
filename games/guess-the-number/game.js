const MAX_ATTEMPTS = 5;

export default {
  id: "guess-the-number",
  title: "Guess the Number",

  // Draws the game inside `container` and wires up its buttons.
  mount(container) {
    container.innerHTML = `
      <h1>Guess the Number:</h1>
      <input class="guess" type="number" />
      <button class="btn">Guess</button>
      <button class="play-again">Play</button>
      <p class="message"></p>
    `;

    // Look elements up inside the container, not the whole page,
    // so other games can reuse the same class names safely.
    const msg = container.querySelector(".message");
    const guessBtn = container.querySelector(".btn");
    const input = container.querySelector(".guess");
    const reset = container.querySelector(".play-again");

    let secret;
    let attempts;

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
  },

  // Called before switching to another game.
  // All listeners here are on elements inside the container, which get
  // removed when the container is cleared, so there's nothing to clean up.
  // Games with timers, animation loops or `document` key listeners must stop them here.
  unmount() {},
};
