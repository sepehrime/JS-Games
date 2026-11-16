export default {
  id: "nato-phoenetic",
  title: "NATO Phoenetic",

  // Draws the game inside `container` and wires up its buttons.
  mount(container) {
    container.innerHTML = `
      <h1>NATO Phoenetic:</h1>
      <input class="word" type="string" />
      <button class="btn">Convert</button>
      <p class="message"></p>
    `;

    // Look elements up inside the container, not the whole page,
    // so other games can reuse the same class names safely.
    const msg = container.querySelector(".message");
    const btn = container.querySelector(".btn");
    const input = container.querySelector(".word");

    msg.textContent = `Enter your name and Press 'Convert' button`;

    const nato = {
      a: "Alfa",
      b: "Bravo",
      c: "Charlie",
      d: "Delta",
      e: "Echo",
      f: "Foxtrot",
      g: "Golf",
      h: "Hotel",
      i: "india",
      j: "Juliet",
    };

    function endGame(message) {
      msg.textContent = message;
      guessBtn.disabled = true;
      reset.disabled = false;
      input.disabled = true;
      reset.focus();
    }

    btn.addEventListener("click", () => {
      const word = String(input.value);
      const wordChars = word.split("");
      const natoPhoenetics = wordChars.map((c) => nato[c]);
      msg.textContent = natoPhoenetics;

      input.value = "";
      input.focus();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
      }
    });
  },

  // Called before switching to another game.
  // All listeners here are on elements inside the container, which get
  // removed when the container is cleared, so there's nothing to clean up.
  // Games with timers, animation loops or `document` key listeners must stop them here.
  unmount() {},
};
