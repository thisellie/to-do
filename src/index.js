import 'normalize.css'
import './style.scss'
import { format, parseISO } from 'date-fns'
import { todo } from './to-do'

const addDialog = document.getElementById('add-dialog')
const addButton = document.getElementById('add-button')
addButton.addEventListener('click', () => addDialog.showModal())

const addForm = document.getElementById('add-form')

function formatDue() {
  const parse = parseISO(document.getElementById('due').value)
  return format(parse, 'MMMM d')
}

export function formatPrio(priority, element) {
  if (priority === 'Low') return element.classList.add('low')
  if (priority === 'Medium') return element.classList.add('medium')
  if (priority === 'High') return element.classList.add('high')
}

addForm.addEventListener('submit', event => {
  event.preventDefault()

  const title = document.getElementById('title').value
  const desc = document.getElementById('desc').value
  const due = formatDue()

  const priorityElements = document.querySelectorAll('input[name="priority"]')
  let priorityValue
  for (const element of priorityElements) {
    if (element.checked) {
      priorityValue = element.value
      break
    }
  }

  todo.addTask(title, desc, due, priorityValue)
  todo.addDom()
  addForm.reset()
  addDialog.close()
})

