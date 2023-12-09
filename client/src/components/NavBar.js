import React from "react";
import "../styles/navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <Navbar
      expand="lg"
      bg="dark"
      fixed="top"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="#home">ZVAP Berat</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
            <Nav.Link href="#home">Kreu</Nav.Link>
            <Nav.Link href="#link">Njoftimet</Nav.Link>
            <Nav.Link href="#link">Lajmet</Nav.Link>
            <Nav.Link href="#link">Provimet Kombëtare</Nav.Link>
            <NavDropdown title="Menu" id="nav-dropdown-dark-example" menuVariant="dark">
              <NavDropdown.Item href="#action/3.1">Institucionet</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Legjislacioni
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Olimpiadat</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
