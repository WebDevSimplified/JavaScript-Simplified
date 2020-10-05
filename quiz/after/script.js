// Link Script Tag
// Select All Elements
// Setup listener on form submit
// Prevent default on form
// Get selected answers (use the `checked` property on the input to determine if it is selected or not)
// Loop through the selected answer to see if they are correct or not (Check the value of the answer to see if it is the string "true")
// For each correct answer add the class `correct` to the parent with the class `question-item` and remove the class `incorrect`.
// For each incorrect answer add the class `incorrect` to the parent with the class `question-item` and remove the class `correct`.

// BONUS: Make sure unanswered questions show up as incorrect
// BONUS: If all answers are correct show the element with the id `alert` and hide it after one second (look into setTimeout) (use the class active to show the alert and remove the class to hide it)

const form = document.getElementById("quiz-form")
const answers = Array.from(document.querySelectorAll(".answer"))
const questionItems = document.querySelectorAll(".question-item")
const alert = document.getElementById("alert")

form.addEventListener("submit", e => {
  e.preventDefault()

  const checkedAnswers = answers.filter(answer => answer.checked)

  questionItems.forEach(questionItem => {
    questionItem.classList.remove("correct")
    questionItem.classList.add("incorrect")
  })

  checkedAnswers.forEach(answer => {
    const questionItem = answer.closest(".question-item")

    if (answer.value === "true") {
      questionItem.classList.remove("incorrect")
      questionItem.classList.add("correct")
    } else {
      questionItem.classList.remove("correct")
      questionItem.classList.add("incorrect")
    }
  })

  if (checkedAnswers.every(answer => answer.value === "true")) {
    alert.classList.add("active")
    setTimeout(() => {
      alert.classList.remove("active")
    }, 1000)
  }
})
