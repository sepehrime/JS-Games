// To add a game: create games/<name>/game.js, import it here, and add it to `games`.
import guessTheNumber from "./games/guess-the-number/game.js";
import natoPhonetic from "./games/nato-phonetic/game.js";
import textAnalyzer from "./games/text-analyzer/game.js";
import powerBall from "./games/powerball/game.js";
import czarCypher from "./games/czar-cypher/game.js";
import diceRoll from "./games/dice-roll/game.js";
const games = [
  textAnalyzer,
  powerBall,
  czarCypher,
  guessTheNumber,
  diceRoll,
  natoPhonetic,
];

const gameList = document.getElementById("game-list");
const container = document.getElementById("game-container");
const welcomeHTML = container.innerHTML; // the "Select a game" screen
let currentGame = null;

// Builds one nav link per game, e.g. <a href="#guess-the-number">.
function buildNav() {
  for (const game of games) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${game.id}`;
    a.textContent = game.title;
    li.append(a);
    gameList.append(li);
  }
}

// Marks the nav link for `id` as active (pass null to clear it).
function highlightNav(id) {
  for (const a of gameList.querySelectorAll("a")) {
    a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
  }
}

// Runs on page load and every time the URL hash changes.
function route() {
  // Stop the game that's on screen before showing anything else.
  if (currentGame) {
    currentGame.unmount();
    currentGame = null;
  }

  const id = location.hash.slice(1); // "#guess-the-number" -> "guess-the-number"
  const game = games.find((g) => g.id === id);

  if (game) {
    container.innerHTML = "";
    game.mount(container);
    currentGame = game;
    highlightNav(id);
    return;
  }

  // No hash: show the welcome screen.
  // Unknown hash (e.g. a typo): say so above the welcome screen.
  container.innerHTML = welcomeHTML;
  if (id) {
    const notFound = document.createElement("p");
    notFound.textContent = `Game "${id}" not found. Pick one from the menu.`;
    container.prepend(notFound);
  }
  highlightNav(null);
}

buildNav();
window.addEventListener("hashchange", route);
route();
