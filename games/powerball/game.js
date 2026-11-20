export default {
  id: "powerball",
  title: "PowerBall",

  // Draws the game inside `container` and wires up its buttons.
  mount(container) {
    container.innerHTML = `
      <h1>PowerBall Number Generator:</h1>
      <form class="main-form">
        <button class="btn">Generate</button>
        <p class="message"></p>
      </form>
    `;

    // Look elements up inside the container, not the whole page,
    // so other games can reuse the same class names safely.
    const msg = container.querySelector(".message");
    const form = container.querySelector(".main-form");
    msg.textContent = `Press Generate to have your Lucky PowerBall Numbers`;

    // A form submits on both a button click and Enter in the input,
    // so one listener covers both.

    form.addEventListener("submit", (event) => {
      event.preventDefault(); // stop the browser from reloading the page
      let luckyNumbers = [];
      for (let i = 0; i < 5; i++) {
        const newPick = Math.floor(Math.random() * 69 + 1)
          .toString()
          .padStart(2, "0");
        if (!luckyNumbers.includes(newPick)) {
          luckyNumbers.push(newPick);
        } else i--;
      }
      luckyNumbers.push(
        Math.floor(Math.random() * 26 + 1)
          .toString()
          .padStart(2, "0"),
      );

      console.log(luckyNumbers);
      // One element per word, so CSS can style each word's first letter.
      // textContent (not innerHTML) keeps typed text from becoming HTML.
      //  .map(([word, count], i) => `${i + 1}. ${word} (${count})`)
      msg.textContent = `Your lucky powerBall numbers are:\n${luckyNumbers.join(" - ")}`;
      // input.value = "";
    });
  },

  // Called before switching to another game.
  // All listeners here are on elements inside the container, which get
  // removed when the container is cleared, so there's nothing to clean up.
  // Games with timers, animation loops or `document` key listeners must stop them here.
  unmount() {},
};
