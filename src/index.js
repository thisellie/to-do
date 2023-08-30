import 'normalize.css'
import './style.scss'
import { todo } from './to-do'
import { format, parseISO } from 'date-fns'
import { loadTodo, selected } from './projects'

const addDialog = document.getElementById('add-dialog')
const addButton = document.getElementById('add-button')

addButton.addEventListener('click', () => addDialog.showModal())

const closeAdd = document.getElementById('add-close')

closeAdd.addEventListener('click', event => {
  event.preventDefault()
  addDialog.close()
})

function formatDue() {
  const date = document.getElementById('due').value
  const parse = parseISO(date)
  return format(parse, 'MMMM d')
}

export function formatPrio(priority, element) {
  if (priority === 'Low') return element.classList.add('low')
  if (priority === 'Medium') return element.classList.add('medium')
  if (priority === 'High') return element.classList.add('high')
}

const addForm = document.getElementById('add-form')

addForm.addEventListener('submit', event => {
  event.preventDefault()

  const title = document.getElementById('title').value
  const desc = document.getElementById('desc').value
  const due = formatDue()
  let priorityValue

  for (const element of document.querySelectorAll('input[name="priority"]')) {
    if (element.checked) {
      priorityValue = element.value
      break
    }
  }

  todo.addTask(title, desc, due, priorityValue)
  addForm.reset()
  addDialog.close()
})

loadTodo(selected)

