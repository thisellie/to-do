import './to-do'
import { formatPrio } from '.'

export let projects = {
  Default: [
    {
      title: 'This a sample to-do title',
      desc: 'Lorem ipsum dolor sit amet.',
      due: 'September 1',
      prio: 'Medium',
    },
  ],
  'Project 1': [
    {
      title: 'This a sample project 1 to-do title',
      desc: 'Lorem ipsum dolor sit amet.',
      due: 'September 3',
      prio: 'High',
    },
  ],
  'Project 2': [
    {
      title: 'This a sample project 2 to-do title',
      desc: 'Lorem ipsum dolor sit amet.',
      due: 'September 6',
      prio: 'Low',
    },
  ],
}

const section = document.querySelector('section')
const ul = document.querySelector('ul')

ul.addEventListener('click', event => {
  if (event.target.nodeName === 'LI') {
    const selected = projects[event.target.textContent]
    section.replaceChildren()
    loadTodo(selected)
  }
})

for (const property in projects) {
  const li = document.createElement('li')
  li.textContent = property
  ul.append(li)
}

const projectDialog = document.getElementById('project-dialog')
const projectForm = document.getElementById('project-form')
const openProject = document.getElementById('add-project')
const closeProject = document.getElementById('close')

openProject.addEventListener('click', () => {
  projectDialog.showModal()
})

closeProject.addEventListener('click', () => {
  event.preventDefault()
  projectDialog.close()
})

projectForm.addEventListener('submit', event => {
  addProject(event.target[0].value)
  projectForm.reset()
})

function addProject(name) {
  projects[name] = []
  const li = document.createElement('li')
  li.textContent = name
  ul.append(li)
  const properties = Object.keys(projects)
  console.log(projects, properties[properties.length - 1], properties.length)
}

function loadTodo(project) {
  const list = document.querySelector('section')

  const container = document.createElement('div')
  container.classList.add('task')

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.id = `item-${project.length}`
  checkbox.classList.add('styled-checkbox')

  const label = document.createElement('div')
  label.classList.add('label')

  const title = document.createElement('label')
  title.htmlFor = `item-${project.length}`
  title.classList.add('checkbox-label')
  title.textContent = project[project.length - 1].title

  const details = document.createElement('div')
  details.classList.add('details')

  const data = [
    project[project.length - 1].desc,
    project[project.length - 1].due,
    project[project.length - 1].prio,
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

