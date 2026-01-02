export default class Task {
  id;
  name;
  description;
  dueDate;
  status;

  constructor(id, name, description, dueDate = Date.now(), status) {
    this.id = id;
    this.name = name;
    this.dueDate = dueDate
    this.description = description;
    this.status = status;
  }
}
