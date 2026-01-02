import { TaskStatus } from "../models/Status";
import TaskItem from "./Task.item";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";

export default function TaskList({
  handleToggle,
  handleDelete,
  handleEdit,
  updateTaskStatus,
}) {
  const tasks = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div
      className="tasks"
      //Drag the task to Onhold section
      onDragOver={(e) => {
        e.preventDefault();
      }}
      //Drop the task to Onhold section
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData("taskId");
        updateTaskStatus(taskId, TaskStatus.ONHOLD);
      }}
    >
      <Form.Check
        inline
        label="All"
        type="radio"
        onChange={() => dispatch(tasksFilter('all'))}
      />
      <Form.Check
        inline
        label="Done"
        type="radio"
        onChange={() => dispatch(tasksFilter('done'))}
      />
      <Form.Check
        inline
        label="Not Done"
        type="radio"
        onChange={() => dispatch(tasksFilter('not done'))}
      />
      {
        //Apply filter to show only the done
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))
      }
    </div>
  );
}
