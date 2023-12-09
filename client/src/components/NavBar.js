import React from "react";
import "../styles/navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router";

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
        <Navbar.Brand href="/">ZVAP Berat</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
            <Nav.Link href="/">Kreu</Nav.Link>
            <Nav.Link href="/njoftime">Njoftimet</Nav.Link>
            <Nav.Link href="/lajme">Lajmet</Nav.Link>
            <Nav.Link href="/provimet_kombetare">Provimet Kombëtare</Nav.Link>
            <NavDropdown title="Menu" id="nav-dropdown-dark-example" menuVariant="dark">
              <NavDropdown.Item href="/institucione">Institucionet</NavDropdown.Item>
              <NavDropdown.Item href="/legjislacioni">
                Legjislacioni
              </NavDropdown.Item>
              <NavDropdown.Item href="/olimpiada">Olimpiadat</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
