const list = document.getElementById("list")
const form = document.getElementById("new-item-form")
const itemInput = document.getElementById("item-input")

form.addEventListener("submit", e => {
  // Prevent submission
  e.preventDefault()

  // Create new item
  const newItem = document.createElement("div")
  newItem.innerText = itemInput.value
  newItem.classList.add("list-item")

  // Add new item to list
  list.appendChild(newItem)

  // Clear input
  itemInput.value = ""

  // Remove when clicked
  newItem.addEventListener("click", () => {
    list.removeChild(newItem)
  })
})
