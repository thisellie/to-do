import { todo } from './to-do'

export let projects = {
  Default: [
    {
      title: 'This is a sample to-do title',
      desc: 'A sample description for this task',
      due: 'September 1',
      prio: 'Medium',
    },
  ],
  'Project 1': [
    {
      title: 'This is a sample project 1 to-do title',
      desc: 'A sample description for this task',
      due: 'September 3',
      prio: 'High',
    },
    {
      title: 'This is a another sample project 1 to-do title',
      desc: 'A sample description for this task',
      due: 'September 3',
      prio: 'High',
    },
  ],
  'Project 2': [
    {
      title: 'This is a sample project 2 to-do title',
      desc: 'A sample description for this task',
      due: 'September 6',
      prio: 'Low',
    },
  ],
}

export let selected = projects.Default

const section = document.querySelector('section')
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
    section.replaceChildren()
    selectTab(document.querySelectorAll('ul li'), e.target)
    loadTodo(selected)
  }
})

openProject.addEventListener('click', () => projectDialog.showModal())

closeProject.addEventListener('click', e => {
  e.preventDefault()
  projectDialog.close()
})

projectForm.addEventListener('submit', e => {
  addProject(e.target[0].value)
  projectForm.reset()
})

function addProject(name) {
  projects[name] = []
  const li = document.createElement('li')
  li.textContent = name
  ul.append(li)
}

export function loadTodo(project) {
  project.forEach((element, index) => todo.addDom(element, index))
}

function selectTab(bar, tab) {
  bar.forEach(button => button.removeAttribute('id'))
  tab.setAttribute('id', 'selected')
}

