import { Card, Form } from "react-bootstrap";
import { Trash, Pencil } from "react-bootstrap-icons";
import { TaskStatus } from "../models/Status";
import { useDispatch } from "react-redux";
import { toggleTask, saveTaskToEdit  } from "../redux/slice/taskSlice";

export default function TaskItem({ task, handleDelete}) {
  const dispatch = useDispatch();

  return (
    <div
      className="task-item"
    >
      <Card style={ task.status === TaskStatus.DONE ? { backgroundColor: "green", color: "white" } : { backgroundColor: "white" }}>
        <Card.Body>
          <div className="task" >
            <div className="task-info">
              <Card.Title className="name">{task.name}</Card.Title>
              <Card.Text className=" mb-1">{task.description}</Card.Text>
              <Card.Text className="duedate">
                <strong>Due date:</strong> {task.dueDate}
              </Card.Text>
            
            </div>
            <div className="task-action">
              {/* Toggle task status whith the radio */}
              <Form.Check
                inline
                label={
                  task.status === TaskStatus.DONE
                   ? "Done"
                   : "Not Done"
                }
                type="checkbox"
                onChange={() =>dispatch(toggleTask(task.id))}
              />

              <Pencil
                className="pencil"
                onClick={() => dispatch(saveTaskToEdit(task))}
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
