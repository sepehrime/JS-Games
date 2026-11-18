export default {
  id: "text-analyzer",
  title: "Text Analyzer",

  // Draws the game inside `container` and wires up its buttons.
  mount(container) {
    container.innerHTML = `
      <h1>Text Analyzer:</h1>
      <form class="main-form">
        <textarea class="text-area" rows="10" cols="50"   placeholder="Enter your text here..."/>
        </textarea>
        <br>
        <button class="btn">Analyze</button>
      </form>
      <p class="message"></p>
    `;

    // Look elements up inside the container, not the whole page,
    // so other games can reuse the same class names safely.
    const msg = container.querySelector(".message");
    const form = container.querySelector(".main-form");
    const input = container.querySelector(".text-area");
    input.value = input.value.trim();

    msg.textContent = `Enter your text and press 'Analyze' button`;

    // A form submits on both a button click and Enter in the input,
    // so one listener covers both.
    input.addEventListener("input", () => {
      const currentLength = input.value.length;
      msg.textContent = `You have typed ${currentLength} characters.`;
    });
    function frequntWords(text) {
      const wordsArray = text.toLowerCase().match(/\b[\w']+\b/g) || [];

      const wordsObject = wordsArray.reduce((freq, item) => {
        freq[item] = (freq[item] || 0) + 1;
        return freq;
      }, {});

      let wordFrequency = [];
      for (let word in wordsObject) {
        wordFrequency.push([word, wordsObject[word]]);
      }
      wordFrequency.sort((a, b) => b[1] - a[1]);
      console.log(wordFrequency);
      return wordFrequency;
    }
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // stop the browser from reloading the page

      const textLength = input.value.length;

      // One element per word, so CSS can style each word's first letter.
      // textContent (not innerHTML) keeps typed text from becoming HTML.
      const most_frequent = frequntWords(input.value);
      msg.textContent = `Your text has ${textLength} characters.\nThe most frequent words are:\n ${most_frequent.slice(0, 4)}`;
      // input.value = "";

      input.focus();
    });
  },

  // Called before switching to another game.
  // All listeners here are on elements inside the container, which get
  // removed when the container is cleared, so there's nothing to clean up.
  // Games with timers, animation loops or `document` key listeners must stop them here.
  unmount() {},
};
