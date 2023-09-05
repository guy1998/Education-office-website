import React from "react";
import "../styles/sideMenu.css";

function SideMenu({ tabs, tabFunctions }) {
  return (
    <div className="myOffcanvas">
      <div className="logoHolder">
        <h3>ZVAP BERAT</h3>
      </div>
      <div className="listHolder">
        <ul>
          <li
            className={"sideMenuOption" + (tabs.home ? " selected" : "")}
            id="kreu"
            onClick={tabFunctions.switchToHome}
          >
            KREU
          </li>
          <li
            className={"sideMenuOption" + (tabs.complaint ? " selected" : "")}
            id="ankesa"
            onClick={tabFunctions.switchToComplaints}
          >
            ANKESAT
          </li>
          <li
            className={"sideMenuOption" + (tabs.announcement ? " selected" : "")}
            id="njoftim"
            onClick={tabFunctions.switchToAnnouncements}
          >
            NJOFTIMET
          </li>
          <li
            className={"sideMenuOption" + (tabs.news ? " selected" : "")}
            id="lajm"
            onClick={tabFunctions.switchToNews}
          >
            LAJMET
          </li>
          <li
            className={"sideMenuOption" + (tabs.institution ? " selected" : "")}
            id="institucion"
            onClick={tabFunctions.switchToInstitutions}
          >
            INSTITUCIONET
          </li>
          <li
            className={"sideMenuOption" + (tabs.legislation ? " selected" : "")}
            id="ligj"
            onClick={tabFunctions.switchToLegislation}
          >
            LEGJISLACIONI
          </li>
          <li
            className={"sideMenuOption" + (tabs.exams ? " selected" : "")}
            id="exam"
            onClick={tabFunctions.switchToExams}
          >
            PROVIMET KOMBETARE
          </li>
          <li
            className={"sideMenuOption" + (tabs.olimp ? " selected" : "")}
            id="olimp"
            onClick={tabFunctions.switchToOlimp}
          >
            OLIMPIADAT
          </li>
          <li
            className={"sideMenuOption" + (tabs.staff ? " selected" : "")}
            id="staff"
            onClick={tabFunctions.switchToStaff}
          >
            STAFI
          </li>
          <li
            className={"sideMenuOption" + (tabs.settings ? " selected" : "")}
            id="settings"
            onClick={tabFunctions.switchToSettings}
          >
            KONFIGURIMET
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
