import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WarningBox from "./utils/WarningBox";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "./redux/slice/taskSlice";

function App() {

  const dispatch = useDispatch();
  // State for warning box visibility and task to delete
  const [showWarning, setShowWarning] = useState(false);

  // State to hold the task being edited
  const [taskToEdit, setTaskToEdit] = useState(null);
 
  // Delete task with confirmation
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Show warning box before deletion
  function handleDelete(task) {
    setTaskToDelete(task);
    setShowWarning(true);
  }

  
  function confirmDelete() {
    // Dispatch delete action here
    dispatch(deleteTask(taskToDelete));
    setTaskToDelete(null);
    setShowWarning(false);
  }

  function cancelDelete() {
    setShowWarning(false);
  }

  return (
    <div className="App">
      <Header firstname={"Sylvestre"} />

      <h1 className="text-center">My To Do App</h1>

      <section className="container-tasks">
        <div>
          <TaskForm taskToEdit={taskToEdit} />
        </div>

        <div className="tasks-onhold">
          <h2>Tasks' List</h2>
          <TaskList handleDelete={handleDelete} />
        </div>
      </section>

      {
        // Show warning box if deletion is confirmed
        showWarning && (
          <WarningBox onConfirm={confirmDelete} onCancel={cancelDelete} />
        )
      }
      <Footer />
    </div>
  );
}

export default App;
