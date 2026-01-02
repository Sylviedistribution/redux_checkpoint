import { Navbar, Nav } from "react-bootstrap";

const Header = ({ firstname }) => {
  return (
    <Navbar bg="dark" variant="dark" className="shadow-sm px-4 py-0">
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home"><h3>My To Do App</h3></Nav.Link>
        </Nav>
        <div className="d-flex align-items-center ms-3">
          <p className="text-white mb-0 me-3">{firstname || "Guest"}</p>
          <img
            src={
              firstname
                ? "/img/avatar.png"
                : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt="avatar"
            width="50"
            height="50"
            className="rounded-circle border border-light"
          />
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
