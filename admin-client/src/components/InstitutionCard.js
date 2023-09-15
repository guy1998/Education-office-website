import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/institutionPage.css";
import MyModal from './MyModal';

function InstitutionCard({ institution }) {

    const [viewSchool, setViewSchool] = useState(false);

  return (
    <Card
      className={
        institution.name.length >= 26
          ? "institutionCard scrollable"
          : "institutionCard"
      }
    >
      <Card.Img
        className="cardImage"
        variant="top"
        src='https://drive.google.com/uc?export=view&id=1Co2egq5xnZ3XvUgPOEFQc09nIULLaslx'
        alt="Institution image"
      />
      <Card.Body>
        <div className="nameContainer">
          <Card.Title className="cardName">
            {institution.name}
          </Card.Title>
        </div>
        <div className="cardButtonDiv">
            <button className="viewCard" onClick={()=>setViewSchool(true)}>Shiko</button>
            <button className="deleteCard"></button>
        </div>
      </Card.Body>
      <MyModal show={viewSchool} onHide={()=>setViewSchool(false)}>
        <div>Ktu do jete shkolla</div>
      </MyModal>
    </Card>
  );
}

export default InstitutionCard;
