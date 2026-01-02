import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDone from "./components/TaskDone";
import TaskOnProgress from "./components/TaskOnProgress";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WarningBox from "./utils/WarningBox";
import { TaskStatus } from "./models/Status";
import { useState, useEffect, use } from "react";
import { useSelector } from "react-redux";

function App() {
  // Initialize tasks from Redux store or as
  const tasks = useSelector((state) => state.tasks);

  // State for warning box visibility and task to delete
  const [showWarning, setShowWarning] = useState(false);

  // State to hold the task to be deleted or edited
  const [taskToDelete, setTaskToDelete] = useState(null);

  // State to hold the task being edited
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Tasks: ", tasks);
  }, [tasks]);

  // Toggle task status between ONHOLD, ONPROGRESS, and DONE
  function handleToggle(task) {
    const newItems = tasks.map((item) => {
      if (item.id !== task.id) return item;

      if (item.status === TaskStatus.ONHOLD)
        return { ...item, status: TaskStatus.ONPROGRESS };

      if (item.status === TaskStatus.ONPROGRESS)
        return { ...item, status: TaskStatus.DONE };

      if (item.status === TaskStatus.DONE)
        return { ...item, status: TaskStatus.ONPROGRESS };

      return { ...item, status: TaskStatus.ONHOLD };
    });

    setTasks(newItems);
  }

  function handleEdit(updatedTask) {
    console.log("Editing task: ", updatedTask);
    setTaskToEdit({ ...updatedTask });
  }

  // Update task status when dropped into a new section
  function updateTaskStatus(taskId, newStatus) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  }

  function confirmEdit(updatedTask) {
    const newItems = tasks.map((item) => {
      if (item.id === updatedTask.id) return { ...item, ...updatedTask }; // Merge updated fields with existing task
      return item; // Keep other tasks unchanged
    });
    setTasks(newItems); // Update state to re-render UI
    localStorage.setItem("tasks", JSON.stringify(newItems)); // Save updated tasks to localStorage
    setTaskToEdit(null); // reset edit state
  }

  // Delete task with confirmation

  // Show warning box before deletion
  function handleDelete(id) {
    setTaskToDelete(id);
    setShowWarning(true);
  }

  function confirmDelete() {
    const newItems = tasks.filter((item) => item.id !== taskToDelete);
    setTasks(newItems);
    localStorage.setItem("tasks", JSON.stringify(newItems));
    setTaskToDelete(null);
    setShowWarning(false);
  }

  function cancelDelete() {
    setTaskToDelete(null);
    setShowWarning(false);
  }

  return (
    <div className="App">
      <Header firstname={"Sylvestre"} />

      <h1 className="text-center">My To Do App</h1>

      <section className="container-tasks">
        <div>
           <TaskForm
            tasks={tasks}
            setTasks={setTasks}
            taskToEdit={taskToEdit}
            confirmEdit={confirmEdit}
          />
        </div>
        
        <div className="tasks-onhold">
          <h2>Tasks' List</h2>
          <TaskList
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            updateTaskStatus={updateTaskStatus}
          />
        </div>

        {/* <div className="tasks-onprogress">
          <h2>Tasks on progress</h2>
          <TaskOnProgress
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            updateTaskStatus={updateTaskStatus}
          />
        </div>

        <div className="tasks-done">
          <h2>Tasks done</h2>
          <TaskDone
            tasks={tasks}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            updateTaskStatus={updateTaskStatus}
          />
        </div> */}
      </section>

      {// Show warning box if deletion is confirmed
      showWarning && (
        <WarningBox onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
      <Footer />
    </div>
  );
}

export default App;
