import React from "react";
import "../styles/institutionPage.css";
import InstitutionCard from "./InstitutionCard";

function InstitutionContainer({ institutions }) {
  return institutions.length
    ? <div className="institutionContainer">
        {institutions.map(institution => {
          return <InstitutionCard institution={institution} />;
        })}
      </div>
    : <div className="noResult">
        Nuk ka rezultate mbi kerkimin tuaj! Provoni te kerkoni dicka tjeter!
      </div>;
}

export default InstitutionContainer;
