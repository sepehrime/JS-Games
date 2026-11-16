const NATO = {
  a: "Alfa",
  b: "Bravo",
  c: "Charlie",
  d: "Delta",
  e: "Echo",
  f: "Foxtrot",
  g: "Golf",
  h: "Hotel",
  i: "India",
  j: "Juliet",
  k: "Kilo",
  l: "Lima",
  m: "Mike",
  n: "November",
  o: "Oscar",
  p: "Papa",
  q: "Quebec",
  r: "Romeo",
  s: "Sierra",
  t: "Tango",
  u: "Uniform",
  v: "Victor",
  w: "Whiskey",
  x: "X-ray",
  y: "Yankee",
  z: "Zulu",
  0: "Zero",
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Niner",
};

export default {
  id: "nato-phonetic",
  title: "NATO Phoenetic",

  // Draws the game inside `container` and wires up its buttons.
  mount(container) {
    container.innerHTML = `
      <h1>NATO Phonetic:</h1>
      <form class="nato-form">
        <input class="word" type="text" />
        <button class="btn">Convert</button>
      </form>
      <p class="message"></p>
    `;

    // Look elements up inside the container, not the whole page,
    // so other games can reuse the same class names safely.
    const msg = container.querySelector(".message");
    const form = container.querySelector(".nato-form");
    const input = container.querySelector(".word");

    msg.textContent = `Enter your text and Press 'Convert' button`;

    // A form submits on both a button click and Enter in the input,
    // so one listener covers both.
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // stop the browser from reloading the page

      const word = input.value.trim().toLowerCase();
      const wordChars = word.split("");
      const natoPhoenetics = wordChars.map((c) => NATO[c] ?? c);

      // One element per word, so CSS can style each word's first letter.
      // textContent (not innerHTML) keeps typed text from becoming HTML.
      const wordEls = natoPhoenetics.map((phonetic) => {
        const span = document.createElement("span");
        span.className = "nato-word";
        span.textContent = phonetic;
        return span;
      });
      msg.replaceChildren(...wordEls);

      input.value = "";
      input.focus();
    });
  },

  // Called before switching to another game.
  // All listeners here are on elements inside the container, which get
  // removed when the container is cleared, so there's nothing to clean up.
  // Games with timers, animation loops or `document` key listeners must stop them here.
  unmount() {},
};
