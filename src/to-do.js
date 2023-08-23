export let tasks = []

export class todo {
  constructor(title, desc, due, prio) {
    this.title = title
    this.desc = desc
    this.due = due
    this.prio = prio
  }
  static addTask(title, desc, due, prio) {
    tasks.push(new todo(title, desc, due, prio))
    console.log(tasks)
  }
}

