const guessingWords = ['hello', 'world', 'string', 'random', 'javascript', 'supercalifragilisticexpialidocious']

const buttons = document.querySelectorAll("button")
const newGame = document.querySelector("#newGame")
const paragraphs = document.getElementsByTagName("p")
const blankSpaces = document.querySelector(".blankSpaces")
const hidden = document.querySelector(".hidden")
let word = ''
let wrongLetters = [] // Draw function will be executed based off of the length of this.
let wrongLetterCounter = 0

const canvas = document.querySelector("canvas")
console.log(canvas.width)
console.log(canvas.height)


buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    if (e.target.id === "newGame") { return } // This prevents the New Game button from being disabled.

    for (let i = 0; i < word.length; i++) {
      if (e.target.id === word.charAt([i])) {
        paragraphs[i].innerHTML = '' // This removes the "__" before replacing with a letter.
        paragraphs[i].innerHTML = e.target.id.toUpperCase()

      } else {
        wrongLetterCounter++

      } if (wrongLetterCounter === word.length) {
        wrongLetters.push(e.target.id)
        wrongLetterCounter = 0
        hangman()
      }
    }
    if (wrongLetterCounter > 0 && wrongLetterCounter < word.length) {
      wrongLetterCounter = 0 // This prevents the counter from being carried over if it did not equal word.length.
    }
    button.setAttribute("disabled", "disabled") // This disables buttons on click.
    console.log(wrongLetters)
  })
})

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

document.addEventListener("keydown", handleKeyDown = (e) => {
  if (alphabet.includes(e.key) === false) { return } // This prevents keys outside of letters to push into the wrongLetters array.

  for (let i = 0; i < word.length; i++) {
    if (e.key === word.charAt([i])) {
      paragraphs[i].innerHTML = '' // This removes the "__" before replacing with a letter.
      paragraphs[i].innerHTML = e.key.toUpperCase()

    } else {
      wrongLetterCounter++

    } if (wrongLetters.includes(e.key) === true) {
      wrongLetterCounter = 0

    } else if (wrongLetterCounter === word.length) {
      wrongLetters.push(e.key)
      wrongLetterCounter = 0
      hangman()
    }
  } if (wrongLetterCounter > 0 && wrongLetterCounter < word.length) {
    wrongLetterCounter = 0 // This prevents the counter from being carried over if it did not equal word.length.
  }

  buttons.forEach(button => {
    if (e.key === button.id) {
      button.setAttribute("disabled", "disabled") // This disables buttons on keydown.
    }
  })
  console.log(wrongLetters)
})
// I feel like I may be able to combine these into 1 function? I can have conditionals using e.type, but keydown has to be added onto the document.

function createNewGame() {
  word = guessingWords[Math.floor(Math.random() * guessingWords.length)]
  console.log(word)

  for (let i = 0; i < word.length; i++) {
    const newParagraph = document.createElement("p")
    blankSpaces.appendChild(newParagraph)

  } for (let i = 0; i < word.length; i++) {
    paragraphs[i].innerText = ''

  } for (let i = 0; i < word.length; i++) {
    paragraphs[i].innerText = "__"

  } buttons.forEach(button => {
    button.removeAttribute("disabled", "disabled")
    wrongLetters = []
  })
  document.addEventListener("keydown", handleKeyDown)
  hidden.classList.remove("overlay")
  hangman()
}
// Need to find a way where it won't select a word that was just chosen.

createNewGame() // This creates the first game when you open the browser.

newGame.addEventListener("click", () => {
  for (let i = word.length - 1; i >= 0; i--) {
    paragraphs[i].remove() // This removes all the p tags before new ones are created.
  }
  createNewGame()
})


function hangman() {
  const canvas = document.getElementById("hangman")
  if (canvas.getContext("2d")) {
    const draw = canvas.getContext("2d")
    if (wrongLetters.length === 0) {
      draw.clearRect(0, 0, canvas.width, canvas.height)
      draw.beginPath()
      draw.moveTo(25, 325)
      draw.lineTo(909, 325)
      draw.moveTo(50, 325)
      draw.lineTo(50, 315)
      draw.lineTo(60, 315)
      draw.lineTo(60, 305)
      draw.lineTo(70, 305)
      draw.lineTo(70, 295)
      draw.lineTo(864, 295)
      draw.lineTo(864, 305)
      draw.lineTo(874, 305)
      draw.lineTo(874, 315)
      draw.lineTo(884, 315)
      draw.lineTo(884, 325)
      draw.stroke()

    } if (wrongLetters.length === 1) {
      draw.beginPath()
      draw.arc(150, 40, 15, 0, Math.PI * 2, true)
      draw.stroke()

    } if (wrongLetters.length === 2) {
      draw.beginPath()
      draw.moveTo(150, 55)
      draw.lineTo(150, 95)
      draw.stroke()

    } if (wrongLetters.length === 3) {
      draw.beginPath()
      draw.moveTo(150, 70)
      draw.lineTo(135, 60)
      draw.stroke()

    } if (wrongLetters.length === 4) {
      draw.beginPath()
      draw.moveTo(150, 70)
      draw.lineTo(165, 60)
      draw.stroke()

    } if (wrongLetters.length === 5) {
      draw.beginPath()
      draw.moveTo(150, 95)
      draw.lineTo(130, 125)
      draw.stroke()

    } if (wrongLetters.length === 6) {
      draw.beginPath()
      draw.moveTo(150, 95)
      draw.lineTo(170, 125)
      draw.stroke()

      hidden.classList.add("overlay")
      document.removeEventListener("keydown", handleKeyDown)
    }
  }
}

hangman() // This will give us the initial drawing when the page is loaded.

// How does the code know when the game is solved? Some sort of checking function, but I'm not sure what it would check for.