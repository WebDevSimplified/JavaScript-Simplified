const list = document.querySelector("#list")
const newTodoForm = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const listItemTemplate = document.querySelector("#list-item-template")
const STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const TODO_KEY = `${STORAGE_PREFIX}-todos`

let todos = loadTodos()
todos.forEach(renderTodo)

list.addEventListener("click", e => {
  if (!e.target.matches("[data-button-delete]")) return

  const parent = e.target.closest(".list-item")
  todos = todos.filter(todo => todo.id !== parent.dataset.todoId)
  parent.remove()
  saveTodos()
})

list.addEventListener("change", e => {
  if (!e.target.matches("[data-list-item-checkbox]")) return

  const parent = e.target.closest(".list-item")
  const todo = todos.find(t => t.id === parent.dataset.todoId)
  todo.complete = e.target.checked
  saveTodos()
})

newTodoForm.addEventListener("submit", e => {
  e.preventDefault()

  if (todoInput.value !== "") {
    const newTodo = {
      name: todoInput.value,
      checked: false,
      id: new Date().valueOf().toString()
    }
    todos.push(newTodo)
    renderTodo(newTodo)
    todoInput.value = ""
    saveTodos()
  }
})

function renderTodo(todo) {
  const templateClone = listItemTemplate.content.cloneNode(true)
  const listItem = templateClone.querySelector(".list-item")
  listItem.dataset.todoId = todo.id
  const textElement = templateClone.querySelector("[data-list-item-text]")
  textElement.innerText = todo.name
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
  checkbox.checked = todo.complete
  list.appendChild(templateClone)
}

function saveTodos() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos))
}

function loadTodos() {
  const todosString = localStorage.getItem(TODO_KEY)
  return JSON.parse(todosString) || []
}
