const guessingWords = ['hello', 'world', 'string', 'random', 'javascript']

const buttons = document.querySelectorAll("button")
const newGame = document.querySelector("#newGame")
const spans = document.querySelectorAll("span")
let word = ''

const createNewGame = () => {
  word = guessingWords[Math.floor(Math.random() * guessingWords.length)] // Pulls random word from array.

  spans.forEach(span => { // When the New Game button is pressed, this will clear the screen before adding "__".
    span.innerText = ''
  })

  spans.forEach(span => { // This creates the same number of "__" as characters in the word.
    if (span.dataset.number < word.length) {
      span.innerText = "__"
    }
  })

  buttons.forEach(button => { // This allows you to click/keydown the letter buttons at the start of a new game.
    button.removeAttribute("disabled", "disabled")
  })
  console.log(word) // Keeping track and making sure the "__" matches the number of characters in the word. Can remove.
}
// Need to find a way where it won't select a word that was just chosen.
// Need to remove the disabled attribute from buttons.

createNewGame() //This creates the first game when you open the browser.


buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    if (e.target.id === "newGame") { return } // This prevents the New Game button from being disabled.

    for (let i = 0; i < word.length; i++) {
      if (e.target.id === word.charAt([i])) {
        spans[i].innerHTML = '' // This removes the "__" before replacing with a letter.
        spans[i].innerHTML = e.target.id.toUpperCase()
      }
    }
    button.setAttribute("disabled", "disabled") // This disables buttons on click.
  })
})

document.addEventListener("keydown", (e) => {
  buttons.forEach(button => {

    for (let i = 0; i < word.length; i++) {
      if (e.key === word.charAt([i])) {
        spans[i].innerHTML = '' // This removes the "__" before replacing with a letter.
        spans[i].innerHTML = e.key.toUpperCase()
      }
    }
    if (e.key === button.id) {
      button.setAttribute("disabled", "disabled") // This disables buttons on keydown.
    }
  })
})
// I feel like I may be able to combine these into 1 function? I can have conditionals using e.type, but keydown has to be added onto the document.

newGame.addEventListener("click", createNewGame)