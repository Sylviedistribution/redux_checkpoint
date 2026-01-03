import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WarningBox from "./utils/WarningBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, saveTaskToDelete } from "./redux/slice/taskSlice";

function App() {

  const dispatch = useDispatch();
  const taskToDelete = useSelector((state) => state.tasks.taskToDelete);

  // State for warning box visibility and task to delete
  const [showWarning, setShowWarning] = useState(false);
 
  // Show warning box before deletion
  function handleDelete(task) {
    dispatch(saveTaskToDelete(task));
    setShowWarning(true);
  }

  
  function confirmDelete() {
    // Dispatch delete action here
    dispatch(deleteTask(taskToDelete.id));
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
        <div className="taskform">
          <TaskForm />
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
