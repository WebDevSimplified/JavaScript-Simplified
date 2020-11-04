import formatCurrency from "./utils/formatCurrency"
import addGlobalEventListener from "./utils/addGlobalEventListener"
import items from "./items.json"
import { addToCart } from "./shoppingCart"

const storeItemTemplate = document.querySelector("#store-item-template")
const storeItems = document.querySelector("[data-store-items]")
const IMAGE_URL = "https://dummyimage.com/420x260"

export function setupStore() {
  if (storeItems == null) return

  addGlobalEventListener("click", "[data-add-to-cart-button]", e => {
    const itemId = parseInt(e.target.closest("[data-item]").dataset.itemId)
    addToCart(itemId)
  })

  items.forEach(renderStoreItem)
}

function renderStoreItem(item) {
  const storeItem = storeItemTemplate.content.cloneNode(true)

  const container = storeItem.querySelector("[data-item]")
  container.dataset.itemId = item.id

  const image = storeItem.querySelector("[data-image]")
  image.src = `${IMAGE_URL}/${item.imageColor}/${item.imageColor}`

  const category = storeItem.querySelector("[data-category]")
  category.innerText = item.category

  const name = storeItem.querySelector("[data-name]")
  name.innerText = item.name

  const price = storeItem.querySelector("[data-price]")
  price.innerText = formatCurrency(item.priceCents / 100)

  storeItems.appendChild(storeItem)
}
