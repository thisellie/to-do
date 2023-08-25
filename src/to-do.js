import { formatPrio } from './index'

export let tasks = []

export class todo {
  // dueValue = () => {
  //   const due = tasks[tasks.length - 1].due
  //   const parse = parseISO(due)
  //   return format(parse, 'MMMM d')
  // }

  constructor(title, desc, due, prio) {
    this.title = title
    this.desc = desc
    this.due = due
    // this.getDue(due)
    this.prio = prio
  }

  static addTask(title, desc, due, prio) {
    tasks.push(new todo(title, desc, due, prio))
    console.log(tasks)
  }

  static addDom() {
    const list = document.querySelector('section')

    const container = document.createElement('div')
    container.classList.add('task')

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.id = `item-${tasks.length - 1}`
    checkbox.classList.add('styled-checkbox')

    const label = document.createElement('div')
    label.classList.add('label')

    const title = document.createElement('label')
    title.htmlFor = `item-${tasks.length}`
    title.classList.add('checkbox-label')
    title.textContent = tasks[tasks.length - 1].title

    const details = document.createElement('div')
    details.classList.add('details')

    const data = [
      tasks[tasks.length - 1].desc,
      tasks[tasks.length - 1].due,
      tasks[tasks.length - 1].prio,
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

