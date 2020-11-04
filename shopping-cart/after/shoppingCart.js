import addGlobalEventListener from "./utils/addGlobalEventListener"
import formatCurrency from "./utils/formatCurrency"
import items from "./items.json"

const STORAGE_KEY = "SHOPPING_CART-cart"
const IMAGE_URL = "https://dummyimage.com/210x130"
let shoppingCart = loadCart()
const cartElement = document.querySelector("[data-cart]")
const cartItemsElement = document.querySelector("[data-cart-items]")
const cartButton = document.querySelector("[data-cart-button]")
const cartItemTemplate = document.querySelector("#cart-item-template")
const cartTotal = document.querySelector("[data-cart-total]")
const cartQuantity = document.querySelector("[data-cart-quantity]")
const cartItemsWrapper = document.querySelector("[data-cart-items-wrapper")

export function setupShoppingCart() {
  addGlobalEventListener("click", "[data-remove-from-cart-button]", e => {
    const itemId = parseInt(e.target.closest("[data-item]").dataset.itemId)
    removeFromCart(itemId)
  })

  renderCart()
  cartButton.addEventListener("click", toggleCartOpen)
}

function renderCart() {
  if (shoppingCart.length === 0) {
    hideCart()
  } else {
    showCart()
    renderCartItems()
  }
}

export function addToCart(id) {
  const existingEntry = shoppingCart.find(entry => entry.id === id)
  if (existingEntry) {
    existingEntry.quantity++
  } else {
    shoppingCart.push({ id: id, quantity: 1 })
  }
  saveCart()
  renderCart()
}

function removeFromCart(id) {
  const existingEntry = shoppingCart.find(entry => entry.id === id)
  console.log(existingEntry)
  if (existingEntry == null) return
  shoppingCart = shoppingCart.filter(entry => entry.id !== id)
  saveCart()
  renderCart()
}

function renderCartItems() {
  cartItemsElement.innerHTML = ""

  shoppingCart.forEach(entry => {
    const cartItem = cartItemTemplate.content.cloneNode(true)
    const item = items.find(i => i.id === entry.id)

    const container = cartItem.querySelector("[data-item]")
    container.dataset.itemId = entry.id

    const image = cartItem.querySelector("[data-image]")
    image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

    const name = cartItem.querySelector("[data-name]")
    name.innerText = item.name

    if (entry.quantity > 1) {
      const quantity = cartItem.querySelector("[data-quantity]")
      quantity.innerText = `x${entry.quantity}`
    }

    const price = cartItem.querySelector("[data-price]")
    price.innerText = formatCurrency((item.priceCents * entry.quantity) / 100)

    cartItemsElement.appendChild(cartItem)
  })

  const totalCents = shoppingCart.reduce((sum, entry) => {
    const item = items.find(i => i.id === entry.id)
    return sum + item.priceCents * entry.quantity
  }, 0)
  cartTotal.innerText = formatCurrency(totalCents / 100)

  cartQuantity.innerHTML = shoppingCart.length
}

function toggleCartOpen() {
  cartItemsWrapper.classList.toggle("invisible")
}

function hideCart() {
  cartElement.classList.add("invisible")
  cartItemsWrapper.classList.add("invisible")
}

function showCart() {
  cartElement.classList.remove("invisible")
}

function saveCart() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingCart))
}

function loadCart() {
  const cart = sessionStorage.getItem(STORAGE_KEY)
  return JSON.parse(cart) || []
}
