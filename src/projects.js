import { todo } from './to-do'

const initial = {
  Default: [
    {
      title: 'This is a sample to-do title',
      desc: 'A default description for this task',
      due: 'September 1, 2023',
      prio: 'Medium',
    },
  ],
  'Project 1': [
    {
      title: 'This is a sample project 1 to-do title',
      desc: 'A project 1 description for this task',
      due: 'September 3, 2023',
      prio: 'High',
    },
    {
      title: 'This is a another sample project 1 to-do title',
      desc: 'An another project 1 description for this task',
      due: 'September 3, 2023',
      prio: 'High',
    },
  ],
  'Project 2': [
    {
      title: 'This is a sample project 2 to-do title',
      desc: 'A project 2 description for this task',
      due: 'September 6, 2023',
      prio: 'Low',
    },
  ],
}

if (localStorage.length === 0) {
  localStorage.setItem('todo', JSON.stringify(initial))
}

export let projects = JSON.parse(localStorage.getItem('todo'))
export let selected = projects.Default
export const section = document.querySelector('section')
const ul = document.querySelector('ul')
const projectDialog = document.getElementById('project-dialog')
const projectForm = document.getElementById('project-form')
const openProject = document.getElementById('add-project')
const closeProject = document.getElementById('close')

for (const property in projects) {
  const li = document.createElement('li')
  li.textContent = property
  ul.append(li)
}

ul.addEventListener('click', e => {
  if (e.target.nodeName === 'LI') {
    selected = projects[e.target.textContent]
    selectTab(e.target)
    loadTodo(selected)
  }
})

openProject.addEventListener('click', () => projectDialog.showModal())

closeProject.addEventListener('click', e => {
  e.preventDefault()
  projectDialog.close()
})

projectForm.addEventListener('submit', e => {
  const name = e.target[0].value
  selectTab(addProject(name))
  selected = projects[name]
  updateStorage()
  loadTodo(selected)
  projectForm.reset()
})

function addProject(name) {
  projects[name] = []
  const li = document.createElement('li')
  li.textContent = name
  ul.append(li)
  return li
}

export function loadTodo(project) {
  section.replaceChildren()
  project.forEach((element, index) => todo.addDom(element, index))
}

export function selectTab(tab) {
  const list = document.querySelectorAll('ul li')
  list.forEach(button => button.removeAttribute('id'))
  tab.setAttribute('id', 'selected')
}

export function updateStorage() {
  localStorage.setItem('todo', JSON.stringify(projects))
}

