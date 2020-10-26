import {
  format,
  getUnixTime,
  fromUnixTime,
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay
} from "date-fns"

const datePickerButton = document.querySelector(".date-picker-button")
const datePicker = document.querySelector(".date-picker")
const datePickerHeaderText = document.querySelector(".current-month")
const previousMonthButton = document.querySelector(".prev-month-button")
const nextMonthButton = document.querySelector(".next-month-button")
const datesGrid = document.querySelector(".date-picker-grid-dates")

datePickerButton.addEventListener("click", () => {
  const date = fromUnixTime(datePickerButton.dataset.selectedDate)
  setupDatePicker(date, date)
  datePicker.classList.toggle("show")
})

function setDate(date) {
  const formattedDate = format(date, "MMMM do, y")
  datePickerButton.innerText = formattedDate
  datePickerButton.dataset.selectedDate = getUnixTime(date)
}

function setupDatePicker(datePickerDate, selectedDate) {
  datePickerHeaderText.innerText = format(datePickerDate, "MMMM - y")
  setupMonthButtons(datePickerDate)
  setupDates(datePickerDate, selectedDate)
}

function setupMonthButtons(date, selectedDate) {
  function nextMonthButtonHandler() {
    previousMonthButton.removeEventListener("click", previousMonthButtonHandler)
    setupDatePicker(addMonths(date, 1), selectedDate)
  }

  function previousMonthButtonHandler() {
    nextMonthButton.removeEventListener("click", nextMonthButtonHandler)
    setupDatePicker(subMonths(date, 1), selectedDate)
  }

  previousMonthButton.addEventListener("click", previousMonthButtonHandler, {
    once: true
  })

  nextMonthButton.addEventListener("click", nextMonthButtonHandler, {
    once: true
  })
}

function setupDates(datePickerDate, selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(datePickerDate))
  const lastWeekEnd = endOfWeek(endOfMonth(datePickerDate))
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd })
  datesGrid.innerHTML = ""

  dates.forEach(date => {
    const dateElement = document.createElement("button")
    dateElement.classList.add("date")
    dateElement.innerText = date.getDate()
    if (!isSameMonth(datePickerDate, date)) {
      dateElement.classList.add("date-picker-other-month-date")
    }
    if (isSameDay(selectedDate, date)) {
      dateElement.classList.add("selected")
    }

    dateElement.addEventListener("click", () => {
      setDate(date)
      datePicker.classList.remove("show")
    })

    datesGrid.appendChild(dateElement)
  })
}

setDate(new Date())
