import { format, parse } from 'date-fns'
import { priority, date } from '.'
import { loadTodo, section, selected } from './projects'

export class todo {
  constructor(title, desc, due, prio) {
    this.title = title
    this.desc = desc
    this.due = due
    this.prio = prio
  }

  static addTask(title, desc, due, prio) {
    selected.push(new todo(title, desc, due, prio))
    this.addDom(selected.at(-1), selected.length - 1)
  }

  static addDom(todo, index) {
    const container = document.createElement('div')
    container.classList.add('task')
    container.dataset.index = index

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('styled-checkbox')

    const label = document.createElement('div')
    label.classList.add('label')

    const title = document.createElement('label')
    title.classList.add('checkbox-label')
    title.textContent = todo.title

    const details = document.createElement('div')
    details.classList.add('details')

    const data = [todo.due, todo.prio]

    data.forEach((property, index) => {
      const desc = document.createElement('p')
      desc.textContent = property
      if (index === data.indexOf(todo.prio)) formatPrio(property, desc)
      details.append(desc)
    })

    this.addTaskEvent(container)
    label.append(title, details)
    container.append(checkbox, label)
    document.querySelector('section').append(container)
  }

  static addTaskEvent(element) {
    element.addEventListener('click', e => {
      const index = e.currentTarget.dataset.index
      if (e.target.type === 'checkbox') {
      } else viewTask(selected[index], index)
    })
  }
}

function formatPrio(priority, element) {
  const map = { Low: 'low', Medium: 'medium', High: 'high' }
  element.classList.add(map[priority])
}

function viewTask(object, index) {
  createDialog(object, index)
}

function createInput(type, name, id, value) {
  const input = document.createElement('input')
  input.type = type
  input.name = name
  input.id = id
  input.value = value
  return input
}

function createDialog(object, index) {
  const { title, desc, due, prio } = object

  const dialog = document.createElement('dialog')
  const form = document.createElement('form')
  form.method = 'dialog'

  const titleInput = createInput('text', 'title', 'title', title)
  const dateInput = createInput(
    'date',
    'due',
    'due',
    format(parse(due, 'MMMM d, yyyy', new Date()), 'yyyy-MM-dd')
  )

  const priorityInput = document.createElement('p')
  priorityInput.textContent = 'Priority: '

  const span = document.createElement('span')
  span.id = 'priority'

  const priorities = [
    { id: 'low', value: 'Low', label: 'Low' },
    { id: 'medium', value: 'Medium', label: 'Medium' },
    { id: 'high', value: 'High', label: 'High' },
  ]

  priorities.forEach(priority => {
    const input = createInput('radio', 'priority', priority.id, priority.value)

    const label = document.createElement('label')
    label.setAttribute('for', priority.id)
    label.textContent = priority.label

    if (priority.value === prio) input.checked = true

    span.appendChild(input)
    span.appendChild(label)
    priorityInput.appendChild(span)
  })

  const textarea = document.createElement('textarea')
  textarea.id = 'desc'
  textarea.name = 'desc'
  textarea.cols = '20'
  textarea.rows = '10'
  textarea.textContent = desc

  form.append(titleInput, dateInput, priorityInput, textarea)
  dialog.append(form)

  const buttons = {
    Update: () => {
      selected[index] = {
        title: titleInput.value,
        desc: textarea.value,
        due: date(dateInput.value),
        prio: priority(),
      }
      loadTodo(selected)
    },
    Delete: () => {
      selected.splice(index, 1)
      loadTodo(selected)
      dialog.close()
    },
    Close: () => dialog.close(),
  }

  for (const text in buttons) {
    const element = document.createElement('button')
    element.addEventListener('click', buttons[text])
    element.textContent = text
    dialog.append(element)
  }

  section.append(dialog)
  dialog.showModal()
}

