const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
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
        <textarea class="text-area" rows="1" cols="20" placeholder="Enter your message here..."/></textarea><br>
        Encyption Key
        <input class="key" type="number"/> <br>
        <button class="btn">Encrypt/Decrypt</button>
      </form>
      <p class="message"></p>
    `;

    // Look elements up inside the container, not the whole page,
    // so other games can reuse the same class names safely.
    const form = container.querySelector(".encrypt-form");
    const msgInput = container.querySelector(".text-area");
    const keyInput = container.querySelector(".key");
    const msgOutput = container.querySelector(".message");

    msgOutput.textContent = `Enter your text and Press 'Encrypt' button`;

    // A form submits on both a button click and Enter in the input,
    // so one listener covers both.
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // stop the browser from reloading the page

      const message = msgInput.value;
      const key = Number(keyInput.value);

      let encryptedMsg = "";
      for (let char of message) {
        if (SYMBOLS.includes(char)) {
          // console.log(
          //   char,
          //   SYMBOLS.indexOf(char),
          //   key,
          //   SYMBOLS.indexOf(char) % 52,
          // );
          encryptedMsg += SYMBOLS.at((SYMBOLS.indexOf(char) + key) % 52);
        } else {
          encryptedMsg += char;
        }
        // console.log(encryptedMsg);
      }
      // One element per word, so CSS can style each word's first letter.
      // textContent (not innerHTML) keeps typed text from becoming HTML.
      msgOutput.textContent = `Your Original Message: ${message}\nYour Encrypted Message:${encryptedMsg}\nEncription key:${key}`;

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
