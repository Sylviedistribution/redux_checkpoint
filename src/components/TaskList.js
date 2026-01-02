import { TaskStatus } from "../models/Status";
import TaskItem from "./Task.item";
import { useSelector, useDispatch, createSelector } from "reduxjs/toolkit";
import { tasksFilter } from "../redux/slice/taskSlice";
import { Form } from "react-bootstrap";

const selectData = createSelector(
  (state) => state.tasks.tasks,
  (state) => state.tasks.filter,
  (tasks, filter) => {
    switch (filter) {
      case "done":
        return tasks.filter((task) => task.status === TaskStatus.DONE);
      case "not done":
        return tasks.filter((task) => task.status !== TaskStatus.DONE);
      default:
        return tasks;
    }
  }
);
export default function TaskList({ handleDelete }) {
  const data = useSelector(selectData);
  const dispatch = useDispatch();

  return (
    <div className="tasks">
      <p>
        Filter Tasks{" "}
        <Form.Check
          inline
          label="All"
          type="radio"
          onChange={() => dispatch(tasksFilter("all"))}
        />
        <Form.Check
          inline
          label="Done"
          type="radio"
          onChange={() => dispatch(tasksFilter("done"))}
        />
        <Form.Check
          inline
          label="Not Done"
          type="radio"
          onChange={() => dispatch(tasksFilter("not done"))}
        />
      </p>

      {
        //Apply filter to show only the done
        data.tasks.map((task) => (
          <TaskItem key={task.id} task={task} handleDelete={handleDelete} />
        ))
      }
    </div>
  );
}
