import { Card, Form } from "react-bootstrap";
import { Trash, Pencil } from "react-bootstrap-icons";
import { TaskStatus } from "../models/Status";
import { useDispatch } from "react-redux";
import { toggleTask, editTask } from "../redux/slice/taskSlice";

export default function TaskItem({ task, handleDelete }) {
  const dispatch = useDispatch();
  return (
    <div
      className="task-item"
      //Drag the task
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("taskId", task.id);
      }}
    >
      <Card>
        <Card.Body>
          <div className="task">
            <div className="task-info">
              <Card.Title className="name">{task.name}</Card.Title>
              <Card.Text className=" mb-1">{task.description}</Card.Text>
              <Card.Text className="duedate">
                <strong>Due date:</strong> {task.dueDate}
              </Card.Text>
              <Card.Text className="status">
                {task.status === TaskStatus.DONE
                  ? "Status: Done"
                  : "Status: Not Done"}
              </Card.Text>
            </div>
            <div className="task-action">
              {/* Toggle task status whith the radio */}
              <Form.Check
                inline
                label={
                  task.status === TaskStatus.ONHOLD
                    ? "Start"
                    : task.status === TaskStatus.ONPROGRESS
                    ? "Done"
                    : "Reset"
                }
                type="radio"
                onChange={() =>dispatch(toggleTask(task))}
              />

              <Pencil
                className="pencil"
                onClick={() => dispatch(editTask(task))}
                title="Edit"
              />

              <Trash
                className="trash"
                onClick={() => {
                  handleDelete(task);
                }}
                title="Delete"
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
