const buttons = document.querySelectorAll("button")

buttons.forEach(button => {
  button.addEventListener("click", () => {
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