import React from "react";
import "../styles/institutionPage.css";

function InstitutionFilter(){
    return(
        <div className="filterDiv">
            <input type='text' className="searchBox" placeholder="Kerko sipas emrit"/>
            <select className="filterSelector">
                <option>Lagjia / provinca</option>
                <option>Clirim</option>
                <option>30 vjetori</option>
                <option>Gorice</option>
                <option>Mangalem</option>
            </select>
            <select className="filterSelector">
                <option>Tipi i institucionit</option>
                <option>9-vjecare</option>
                <option>Gjimnaz</option>
                <option>Profesionale</option>
            </select>
        </div>
    );
}

export default InstitutionFilter;