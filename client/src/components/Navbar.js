import { React } from "react";
import "../styles/navbar.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function NavBar({home, institutions, announcements}) {
  return (
    <>
      <nav id="navbar">
        <ul className="navbarOptions">
          <li id="webLogo">ZVA BERAT</li>
          <li>
            <Tabs
              id="justify-tab-example"
              className="customTabs"
              justify
            >
              <Tab eventKey="kreu" title="Kreu" className="customTab" onEntering={home}></Tab>
              <Tab eventKey="njoftime" title="Njoftime" className="customTab" onEntering={announcements}></Tab>
              <Tab
                eventKey="institucione"
                title="Institucionet"
                className="customTab"
                onEntering={institutions}
              ></Tab>
              <Tab
                eventKey="lajme"
                title="Lajme"
                className="customTab"
                onEntering={()=>{}}
              ></Tab>
            </Tabs>
          </li>
        </ul>
        <ul className="navbarOptions">
          <li id="logIn"></li>
          <li id="help"></li>
        </ul>
      </nav>
      <div id="moto">
        <h4>Arsimi i gjeneratës tjetër</h4>
      </div>
    </>
  );
}

export default NavBar;
