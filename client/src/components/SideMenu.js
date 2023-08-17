import React from "react";
import "../styles/sideMenu.css";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

function SideMenu() {

  return (
    <>
      <aside id="sideMenu">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={15}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="statistikat" className="nav-item1 extra">STATISTIKAT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="korrupsion" className="nav-item1">RRJETI ANTI-KORRUPSION</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ligj" className="nav-item1">LEGJISLACIONI</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="matura" className="nav-item1">MATURA SHTETËRORE</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="lirimi" className="nav-item1">PROVIMET E LIRIMIT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="transparenca" className="nav-item1">PROGRAMI I TRANSPARENCËS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="praktika" className="nav-item1">PRAKTIKA PROFESIONALE</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="personeli" className="nav-item1">PERSONELI</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="transporti" className="nav-item1 bottomExtra">TRANSPORTI</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Tab.Container>
      </aside>
    </>
  );
}

export default SideMenu;
