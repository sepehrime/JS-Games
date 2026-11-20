const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
  "",
);

export default {
  id: "czar-cypher",
  title: "Czar Cypher",

  // Draws the game inside `container` and wires up its buttons.
  mount(container) {
    container.innerHTML = `
      <h1>Czar Cypher:</h1>
      <form class="encrypt-form">
        Message
        <input class="message" type="text" /><br>
        Encyption Key
        <input class="key" type="number" /> <br>
        <button class="btn">Encrypt</button>
      </form>
      <p class="message"></p>
    `;

    // Look elements up inside the container, not the whole page,
    // so other games can reuse the same class names safely.
    const msg = container.querySelector(".message");
    const form = container.querySelector(".encrypt-form");
    const msgInput = container.querySelector(".message");
    const keyInput = container.querySelector(".key");

    msg.textContent = `Enter your text and Press 'Encrypt' button`;

    // A form submits on both a button click and Enter in the input,
    // so one listener covers both.
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // stop the browser from reloading the page

      const message = msgInput.value;
      const key = keyInput.value;

      const encryptedMsg = message.toUpperCase();

      // One element per word, so CSS can style each word's first letter.
      // textContent (not innerHTML) keeps typed text from becoming HTML.
      msg.textContent = `Your Encrypted messages is:\n${encryptedMsg} ${key}`;

      msgInput.value = "";
      keyInput.value = "";
      msgInput.focus();
    });
  },

  // Called before switching to another game.
  // All listeners here are on elements inside the container, which get
  // removed when the container is cleared, so there's nothing to clean up.
  // Games with timers, animation loops or `document` key listeners must stop them here.
  unmount() {},
};
