import { TaskStatus } from "../models/Status";
import TaskItem from "./TaskItem";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { tasksFilter } from "../redux/slice/taskSlice";
import { Form } from "react-bootstrap";

const selectFilteredTasks = createSelector(
  (state) => state.tasks.tasks,
  (state) => state.tasks.filter,
  (tasks, filter) => {
    switch (filter) {
      case "done":
        return tasks.filter((task) => task.status === TaskStatus.DONE);

      case "not_done":
        return tasks.filter((task) => task.status === TaskStatus.NOT_DONE);

      default:
        return tasks;
    }
  }
);
export default function TaskList({ handleDelete }) {
  const data = useSelector(selectFilteredTasks);
  const dispatch = useDispatch();

  return (
    <div className="tasks">
      <div className="filter-tasks">
        <span>Filter Tasks:</span>
        <span>
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
        </span>
      </div>

      {
        //Apply filter to show only the done
        data.map((task) => (
          <TaskItem key={task.id} task={task} handleDelete={handleDelete} />
        ))
      }
    </div>
  );
}
