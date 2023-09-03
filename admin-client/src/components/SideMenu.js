import React from "react";
import "../styles/sideMenu.css";

function SideMenu() {
    return (
        <div className="myOffcanvas">
            <div className="logoHolder">
                <h3>ZVAP BERAT</h3>
            </div>
            <div className="listHolder">
                <ul>
                    <li className="sideMenuOption" id="kreu">KREU</li>
                    <li className="sideMenuOption" id="ankesa">ANKESAT</li>
                    <li className="sideMenuOption" id="njoftim">NJOFTIMET</li>
                    <li className="sideMenuOption" id="lajm">LAJMET</li>
                    <li className="sideMenuOption" id="institucion">INSTITUCIONET</li>
                    <li className="sideMenuOption" id="ligj">LEGJISLACIONI</li>
                    <li className="sideMenuOption" id="exam">PROVIMET KOMBETARE</li>
                    <li className="sideMenuOption" id="olimp">OLIMPIADAT</li>
                    <li className="sideMenuOption" id="staff">STAFI</li>
                    <li className="sideMenuOption" id="settings">KONFIGURIMET</li>
                </ul>
            </div>
        </div>
    );
}

export default SideMenu;