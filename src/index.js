import 'normalize.css'
import './style.scss'
import { todo } from './to-do'
import { format, parseISO } from 'date-fns'
import { loadTodo, selectTab, selected, updateStorage } from './projects'

const addDialog = document.getElementById('add-dialog')
const addButton = document.getElementById('add-button')
const closeAdd = document.getElementById('add-close')
const addForm = document.getElementById('add-form')

addButton.addEventListener('click', () => addDialog.showModal())

closeAdd.addEventListener('click', e => {
  e.preventDefault()
  addDialog.close()
})

addForm.addEventListener('submit', e => {
  e.preventDefault()

  const title = document.getElementById('title').value
  const desc = document.getElementById('desc').value
  const due = date(document.getElementById('due').value)
  const priorityValue = priority()

  todo.addTask(title, desc, due, priorityValue)
  updateStorage()
  addForm.reset()
  addDialog.close()
})

export function date(value) {
  if (!value) return (value = format(new Date(), 'MMMM d, yyyy'))
  else return format(parseISO(value), 'MMMM d, yyyy')
}

export function priority() {
  for (const element of document.querySelectorAll('input[name="priority"]'))
    if (element.checked) return element.value
}

loadTodo(selected)
selectTab(document.querySelectorAll('ul li')[0])

