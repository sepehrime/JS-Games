export default {
  id: "dice-roll",
  title: "Dice Roll",

  // Draws the game inside `container` and wires up its buttons.
  mount(container) {
    // The <link> lives inside the container, so it is removed (and its styles
    // stop applying) when app.js clears the container to switch games.
    const cssUrl = new URL("./style.css", import.meta.url);
    container.innerHTML = `
      <link rel="stylesheet" href="${cssUrl}" />
      <h1>Roll the dice</h1>

    <div class="container dice-roll">

      <div class="dice">
        <p>Player 1</p>
        <img class="img1" src="" />
      </div>

      <div class="dice">
        <p>Player 2</p>
        <img class="img2" src="" />
      </div>
      <div>
        <button class="playBtn">Play</button>
        <h2 class="winner"></h2>
      </div>
    </div>

    `;

    // Look elements up inside the container, not the whole page,
    // so other games can reuse the same class names safely.
    const player1Image = container.querySelector(".img1");
    const player2Image = container.querySelector(".img2");
    const playBtn = container.querySelector(".playBtn");
    const winner = container.querySelector(".winner");

    playBtn.addEventListener("click", () => {
      winner.textContent = "";
      const dice1 = Math.floor(Math.random() * 6 + 1);
      const dice2 = Math.floor(Math.random() * 6 + 1);
      console.log(dice1, dice2);
      // Resolve relative to this module, not the page (index.html at the root).
      player1Image.src = new URL(`./images/dice${dice1}.png`, import.meta.url);
      player2Image.src = new URL(`./images/dice${dice2}.png`, import.meta.url);
      if (dice1 > dice2) {
        winner.textContent = "Player 1 wins!";
      } else if (dice2 > dice1) {
        winner.textContent = "Player 2 wins!";
      } else {
        winner.textContent = "It's a tie!";
      }
    });
  },
  // Called before switching to another game.
  // All listeners here are on elements inside the container, which get
  // removed when the container is cleared, so there's nothing to clean up.
  // Games with timers, animation loops or `document` key listeners must stop them here.
  unmount() {},
};
