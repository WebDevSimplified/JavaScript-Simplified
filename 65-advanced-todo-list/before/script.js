const form = document.querySelector('#new-todo-form')
const todoInput = document.querySelector('#todo-input')
const list = document.querySelector('#list')
const template = document.querySelector('#list-item-template')
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST'
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()
todos.forEach((todo) => renderTodo(todo))

list.addEventListener('change', (e) => {
  if (!e.target.matches('[data-list-item-checkbox]')) return

  // Get the todo that is clicked on
  const parent = e.target.closest('.list-item')
  const todoId = parent.dataset.todoId
  const todo = todos.find((t) => t.id === todoId)
  // Toggle the complete property to be equal to the checkbox value
  todo.complete = e.target.checked
  // Save our updated todo
  saveTodos()
})

list.addEventListener('click', (e) => {
  if (!e.target.matches('[data-button-delete]')) return

  const parent = e.target.closest('.list-item')
  const todoId = parent.dataset.todoId

  //Remove todo from screen
  parent.remove()
  //Remove todo from list
  todos = todos.filter((todo) => todo.id !== todoId)
  //Save the new todos
  saveTodos()
})

form.addEventListener('submit', (e) => {
  //Prevent refresh of page when form is submitted
  e.preventDefault()

  //gets value inside of input
  const todoName = todoInput.value
  if (todoName === '') return
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  }
  todos.push(newTodo)
  renderTodo(newTodo)
  saveTodos()
  todoInput.value = ''
})

function renderTodo(todo) {
  //Get all content inside template, clone it, and store in variable. 'true' ensures all code is cloned.
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector('.list-item')
  listItem.dataset.todoId = todo.id
  const textElement = templateClone.querySelector('[data-list-item-text]')
  textElement.innerText = todo.name
  const checkbox = templateClone.querySelector('[data-list-item-checkbox]')
  checkbox.checked = todo.complete
  list.appendChild(templateClone)
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
  return JSON.parse(todosString) || []
}
