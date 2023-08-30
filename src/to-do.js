import { formatPrio } from '.'
import { selected } from './projects'

export class todo {
  constructor(title, desc, due, prio) {
    this.title = title
    this.desc = desc
    this.due = due
    this.prio = prio
  }

  static addTask(title, desc, due, prio) {
    selected.push(new todo(title, desc, due, prio))
    this.addDom(selected.at(-1), selected.length)
  }

  static addDom(todo, index) {
    const list = document.querySelector('section')

    const container = document.createElement('div')
    container.classList.add('task')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = `item-${index}`
    checkbox.classList.add('styled-checkbox')

    const label = document.createElement('div')
    label.classList.add('label')

    const title = document.createElement('label')
    title.htmlFor = `item-${index}`
    title.classList.add('checkbox-label')
    title.textContent = todo.title

    const details = document.createElement('div')
    details.classList.add('details')

    const data = [todo.desc, todo.due, todo.prio]

    data.forEach((property, index) => {
      const desc = document.createElement('p')
      desc.textContent = property
      if (index === 2) formatPrio(property, desc)
      details.append(desc)
    })

    label.append(title, details)
    container.append(checkbox, label)
    list.append(container)
  }
}

