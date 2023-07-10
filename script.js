const guessingWords = ['hello', 'world', 'string', 'random', 'javascript']
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const buttons = document.querySelectorAll("button")
const newGame = document.querySelector("#newGame")
const paragraphs = document.getElementsByTagName("p")
const blankSpaces = document.querySelector(".blankSpaces")
const hidden = document.querySelector(".hidden")
let word = ''
let wrongLetters = [] // Draw function will be executed based off of the length of this.
let wrongLetterCounter = 0


buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    if (e.target.id === "newGame") { return } // This prevents the New Game button from being disabled.

    for (let i = 0; i < word.length; i++) {
      if (e.target.id === word.charAt([i])) {
        paragraphs[i].innerHTML = '' // This removes the "__" before replacing with a letter.
        paragraphs[i].innerHTML = e.target.id.toUpperCase()
        paragraphs[i].classList.add("changeFont")
        button.classList.add("changeFontColor")

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
    button.classList.add("changeFontColor")
    button.setAttribute("disabled", "disabled") // This disables buttons on click.
  })
})


document.addEventListener("keydown", handleKeyDown = (e) => {
  if (alphabet.includes(e.key) === false) { return } // This prevents keys outside of letters to push into the wrongLetters array.

  for (let i = 0; i < word.length; i++) {
    if (e.key === word.charAt([i])) {
      paragraphs[i].innerHTML = '' // This removes the "__" before replacing with a letter.
      paragraphs[i].innerHTML = e.key.toUpperCase()
      paragraphs[i].classList.add("changeFont")

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
      button.classList.add("changeFontColor")
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
    button.classList.remove("changeFontColor")
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

      draw.lineWidth = 10; draw.strokeStyle = "rgb(52, 29, 29)"
      draw.beginPath();
      draw.moveTo(0, 325); draw.lineTo(934, 325);
      draw.moveTo(10, 315); draw.lineTo(924, 315);
      draw.moveTo(20, 305); draw.lineTo(914, 305);
      draw.moveTo(30, 295); draw.lineTo(904, 295); draw.stroke();

      draw.lineWidth = 25
      draw.moveTo(300, 305); draw.lineTo(300, 50);
      draw.moveTo(270, 290); draw.lineTo(330, 290); draw.stroke();

      draw.lineWidth = 15
      draw.moveTo(287.5, 50); draw.lineTo(467, 50); draw.stroke();

      draw.lineWidth = 1; draw.strokeStyle = "rgb(0,0,0)"; draw.beginPath();
      draw.ellipse(460, 62, 2, 5, 0, 0, Math.PI * 2); draw.stroke();
      draw.ellipse(461, 68, 2, 5, 0, 0, Math.PI * 2); draw.stroke();
      draw.ellipse(460, 74, 2, 5, 0, 0, Math.PI * 2); draw.stroke();
      draw.ellipse(461, 80, 2, 5, 0, 0, Math.PI * 2); draw.stroke();
      draw.ellipse(460, 86, 2, 5, 0, 0, Math.PI * 2); draw.stroke();

    } if (wrongLetters.length === 1) {
      draw.beginPath(); draw.arc(461, 105, 15, 0, Math.PI * 2); draw.stroke()

    } if (wrongLetters.length === 2) {
      draw.beginPath(); draw.moveTo(461, 120); draw.lineTo(461, 190); draw.stroke();
      draw.moveTo(461, 122); draw.ellipse(461, 122, 5, 2, Math.PI, 0, Math.PI * 2); draw.stroke()

    } if (wrongLetters.length === 3) {
      draw.beginPath(); draw.moveTo(461, 130); draw.lineTo(445, 160); draw.stroke()

    } if (wrongLetters.length === 4) {
      draw.beginPath(); draw.moveTo(461, 130); draw.lineTo(477, 160); draw.stroke()

    } if (wrongLetters.length === 5) {
      draw.beginPath(); draw.moveTo(461, 190); draw.lineTo(445, 250); draw.stroke()

    } if (wrongLetters.length === 6) {
      draw.beginPath(); draw.moveTo(461, 190); draw.lineTo(477, 250); draw.stroke()

      hidden.classList.remove("hidden")
      hidden.classList.add("overlay")
      document.removeEventListener("keydown", handleKeyDown)
    }
  }
}

hangman() // This will give us the initial drawing when the page is loaded.

// How does the code know when the game is solved? Some sort of checking function, but I'm not sure what it would check for. INNERTEXT?