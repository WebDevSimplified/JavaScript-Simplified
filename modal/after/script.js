/*
  TODO: 2. Select the elements with the following IDs
    * modal
    * open-modal-btn
    * close-modal-btn
    * BONUS: overlay
*/
const modal = document.querySelector("#modal")
const openModalButton = document.querySelector("#open-modal-btn")
const closeModalButton = document.querySelector("#close-modal-btn")
const overlay = document.querySelector("#overlay")

// TODO: 3. Create a click event listener for the open-modal-btn that adds the class "open" to the modal
// BONUS: Also add the class "open" to the overlay
openModalButton.addEventListener("click", () => {
  modal.classList.add("open")
  overlay.classList.add("open")
})

// TODO: 4. Create a click event listener for the close-modal-btn that removes the class "open" from the modal
// BONUS: Also remove the class "open" from the overlay
closeModalButton.addEventListener("click", closeModal)

// BONUS: Add a click event listener to the overlay that removes the class "open" from the modal and the overlay
overlay.addEventListener("click", closeModal)

function closeModal() {
  modal.classList.remove("open")
  overlay.classList.remove("open")
}
