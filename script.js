const guessingWords = ['string', 'javascript', 'cascading', 'style', 'hypertext', 'language', 'boolean', 'argument', 'attribute', 'variable', 'parameter',
  'concatenate', 'element', 'selector', 'terminal', 'constant', 'dataset', 'toggle', 'disabled', 'ellipse', 'canvas']
const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

const buttons = document.querySelectorAll("button")
const newGame = document.querySelector("#newGame")
const paragraphs = document.getElementsByTagName("p")
const blankSpaces = document.querySelector(".blankSpaces")
const hiddenSection = document.querySelector(".hiddenSection")
const winGame = document.querySelector("#win")
const loseGame = document.querySelector("#lose")
const playAgain = document.querySelector("#playAgain")

let word = ''
let wordManager = [...guessingWords]
let wrongLetters = []
let wrongLetterCounter = 0
let winCount = 0


// Button click and keydown functions
buttons.forEach(button => {
  button.addEventListener("click", (e) => {
    if (e.target.id === "newGame") { return }

    for (let i = 0; i < word.length; i++) {
      if (e.target.id === word.charAt([i])) {
        paragraphs[i].innerHTML = ''
        paragraphs[i].innerHTML = e.target.id.toUpperCase()
        paragraphs[i].classList.add("changeFont")

      } else {
        wrongLetterCounter++

      } if (wrongLetterCounter === word.length) {
        wrongLetters.push(e.target.id)
        wrongLetterCounter = 0
        hangman()
      }
    }
    if (wrongLetterCounter > 0 && wrongLetterCounter < word.length) {
      wrongLetterCounter = 0
    }
    win()
    button.classList.add("changeFontColor")
    button.setAttribute("disabled", "disabled")
  })
})


document.addEventListener("keydown", handleKeyDown = (e) => {
  if (alphabet.includes(e.key) === false) { return }

  for (let i = 0; i < word.length; i++) {
    if (e.key === word.charAt([i])) {
      paragraphs[i].innerHTML = ''
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
    wrongLetterCounter = 0
  }
  win()

  buttons.forEach(button => {
    if (e.key === button.id) {
      button.classList.add("changeFontColor")
      button.setAttribute("disabled", "disabled")
    }
  })
})


// New game function
function createNewGame() {
  if (wordManager.length == 0) {
    wordManager = [...guessingWords]
  }

  word = wordManager.splice(Math.floor(Math.random() * wordManager.length), 1)[0]
  console.log(word)

  for (let i = 0; i < word.length; i++) {
    const newParagraph = document.createElement("p")
    blankSpaces.appendChild(newParagraph)

  } for (let i = 0; i < word.length; i++) {
    paragraphs[i].innerText = "__"

  } buttons.forEach(button => {
    button.removeAttribute("disabled", "disabled")
    button.classList.remove("changeFontColor")
    wrongLetters = []
  })
  document.addEventListener("keydown", handleKeyDown)
  hangman()
}

createNewGame()


// New game button functions
const newGameButtonClick = () => {
  for (let i = word.length - 1; i >= 0; i--) {
    paragraphs[i].remove()
  }
  hiddenSection.classList.add("hidden")
  hiddenSection.classList.remove("overlay")
  winGame.classList.add("hidden")
  loseGame.classList.add("hidden")
  playAgain.classList.add("hidden")
  createNewGame()
}

newGame.addEventListener("click", newGameButtonClick)
playAgain.addEventListener("click", newGameButtonClick)


// Drawing hangman function
function hangman() {
  const canvas = document.getElementById("hangman")
  if (canvas.getContext("2d")) {
    const draw = canvas.getContext("2d")
    if (wrongLetters.length === 0) {
      draw.clearRect(0, 0, canvas.width, canvas.height)

      draw.lineWidth = 10; draw.strokeStyle = "rgb(52, 29, 29)"; draw.beginPath();
      draw.moveTo(0, 315); draw.lineTo(934, 315);
      draw.moveTo(10, 305); draw.lineTo(924, 305);
      draw.moveTo(20, 295); draw.lineTo(914, 295);
      draw.moveTo(30, 285); draw.lineTo(904, 285); draw.stroke();

      draw.lineWidth = 25; draw.strokeStyle = "rgb(0, 0, 0)"; draw.beginPath()
      draw.moveTo(300, 280); draw.lineTo(300, 50);
      draw.moveTo(270, 280); draw.lineTo(330, 280); draw.stroke();

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
      draw.beginPath(); draw.moveTo(461, 190); draw.lineTo(477, 250)
      draw.moveTo(454, 100); draw.lineTo(458, 105); draw.moveTo(458, 100); draw.lineTo(454, 105)
      draw.moveTo(465, 100); draw.lineTo(469, 105); draw.moveTo(469, 100); draw.lineTo(465, 105); draw.stroke()

      lose()
    }
  }
}

hangman()


// Win function
function win() {
  for (let i = 0; i < word.length; i++) {
    if (paragraphs[i].innerText != "__") {
      winCount++
    }
  } if (winCount !== word.length) {
    winCount = 0

  } else if (winCount === word.length) {
    hiddenSection.classList.remove("hidden")
    hiddenSection.classList.add("overlay")
    winGame.classList.remove("hidden")
    playAgain.classList.remove("hidden")
    document.removeEventListener("keydown", handleKeyDown)
    winCount = 0
  }
  hangman()
}


// Lose function
function lose() {
  hiddenSection.classList.remove("hidden")
  hiddenSection.classList.add("overlay")
  loseGame.classList.remove("hidden")
  playAgain.classList.remove("hidden")
  document.removeEventListener("keydown", handleKeyDown)
}