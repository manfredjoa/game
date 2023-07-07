const guessingWords = ['hello', 'world', 'string']

const buttons = document.querySelectorAll("button")
const newGame = document.querySelector("#newGame")
const spans = document.querySelectorAll("span")
let word = ''

const createNewGame = () => {
  word = guessingWords[Math.floor(Math.random() * guessingWords.length)]

  spans.forEach(span => {
    if (span.dataset.number < word.length) {
      span.innerText = '__'
    }
  })
  console.log(word)
}
// Need to find a way where it won't select a word that was just chosen.
// Need to remove the disabled attribute from buttons.

createNewGame() //This creates the first game when you open the browser.

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.id === "newGame") { return }

    button.setAttribute("disabled", "disabled")
  })
})

document.addEventListener("keydown", (e) => {
  buttons.forEach(button => {
    if (e.key === button.id) {
      button.setAttribute("disabled", "disabled")
    }
  })
})
// These will disable the buttons and prevent them from being clicked. Build on these to change INNERTEXT to the letter selected.

newGame.addEventListener("click", createNewGame)