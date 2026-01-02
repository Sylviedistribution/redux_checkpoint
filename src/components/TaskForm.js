import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Task from "../models/Task";
import { TaskStatus } from "../models/Status";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/slice/taskSlice";

export default function TaskForm({ taskToEdit, confirmEdit }) {
  const tasks = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    name: false,
    description: false,
    dueDate: false,
  });
  const isValid = Object.keys(errors).length === 0; // Verifier si le formulaire est valide

  // Use useEffect to load task data into the form when taskToEdit changes
  useEffect(() => {
    if (taskToEdit && taskToEdit.id) {
      setName(taskToEdit.name || "");
      setDescription(taskToEdit.description || "");
      setDueDate(taskToEdit.dueDate || "");
    } else {
      clean();
    }
  }, [taskToEdit]);

  useEffect(() => {
    setErrors(getErrors(name, description, dueDate));
  }, [name, description, dueDate]);

  function clean() {
    setName("");
    setDescription("");
    setDueDate("");
    setErrors({});
    setTouched({ name: false, description: false, dueDate: false });
  }

  function getErrors(name, description, dueDate) {
    const errors = {};

    if (!name) errors.name = "Task name is required";
    if (name.length > 50)
      errors.name = "Task name must be less than 50 characters";

    if (!description) errors.description = "Description is required";
    if (description.length > 100)
      errors.description = "Description must be less than 100 characters";

    if (!dueDate) errors.dueDate = "Due date is required";
    else if (new Date(dueDate) < new Date())
      errors.dueDate = "Due date cannot be in the past";

    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) return;

    if (taskToEdit) {
      confirmEdit({
        ...taskToEdit, // Take a copy of the task to be edited using the spread operator, then modify its fields.
        name,
        description,
        dueDate,
      });
      return;
    }
    const newTask = new Task(
      crypto.randomUUID(),
      name,
      description,
      dueDate,
      TaskStatus.ONHOLD
    );
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    clean();
  }

  return (
    <Form onSubmit={(e) => dispatch(addTask(e))}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control
          type="text"
          placeholder="Enter task name"
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(touched =>({ ...touched, name: true }))}
          value={name}
        />
        {touched.name && errors.name && (
          <small className="text-danger">{errors.name}</small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Control
          type="text"
          placeholder="Enter task description"
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched(touched =>({ ...touched, description: true }))}
          value={description}
        />
        {touched.description && errors.description && (
          <small className="text-danger">{errors.description}</small>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDescription">
        <strong>Due Date</strong>
        <Form.Control
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          onBlur={() => setTouched(touched =>({ ...touched, dueDate: true }))}
          value={dueDate}
        />
        {touched.dueDate && errors.dueDate && (
          <small className="text-danger">{errors.dueDate}</small>
        )}
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" disabled={!isValid} onClick ={()=> dispatch(addTask(task))}>
          {taskToEdit && taskToEdit.id ? "Update Task" : "Add Task"} 
        </Button>
      </div>
    </Form>
  );
}
