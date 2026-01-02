import { Card , Button} from "react-bootstrap";

export default function WarningBox({ onConfirm, onCancel }) {
  return (
    <div className="warning-box">
      <Card>
        <Card.Header className="text-center bg-warning">
          <Card.Title >Warning</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text className="text-center">
            Are you sure? Do you want to delete this task?
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center d-flex justify-content-around">
          <Button variant="danger" onClick={onConfirm}>Yes</Button>
          <Button variant="secondary" onClick={onCancel}>No</Button>
        </Card.Footer>
      </Card>

     
    </div>
  );
}
