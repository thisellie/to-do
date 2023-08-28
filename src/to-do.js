import { projects } from './projects'
import { formatPrio } from '.'

export class todo {
  constructor(title, desc, due, prio) {
    this.title = title
    this.desc = desc
    this.due = due
    this.prio = prio
  }

  static addTask(title, desc, due, prio) {
    projects.Default.push(new todo(title, desc, due, prio))
    this.addDom(projects.Default)
  }

  static addDom(project) {
    const index = project.length
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
    title.textContent = project[index - 1].title

    const details = document.createElement('div')
    details.classList.add('details')

    const data = [
      project[index - 1].desc,
      project[index - 1].due,
      project[index - 1].prio,
    ]

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

