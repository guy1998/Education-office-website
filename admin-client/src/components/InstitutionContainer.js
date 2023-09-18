import React from "react";
import "../styles/institutionPage.css";
import InstitutionCard from "./InstitutionCard";

function InstitutionContainer({ institutions, onDelete, onEdit }) {
  return institutions.length
    ? <div className="institutionContainer">
        {institutions.map(institution => {
          return <InstitutionCard institution={institution} onDelete={onDelete} onEdit={onEdit}/>;
        })}
      </div>
    : <div className="noResult">
        Nuk ka rezultate mbi kerkimin tuaj! Provoni te kerkoni dicka tjeter!
      </div>;
}

export default InstitutionContainer;
