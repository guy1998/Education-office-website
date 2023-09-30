import React from "react";
import "../styles/navbar.css";

function MainImage() {
  return (
    <div className="mainImageDiv">
      <h1 className="title">MIRËSEVINI NË ZVAP</h1>
      <p className="smallMoto">
        <div className="castleHolder" id="rightCastle"/>Arsimi i gjeneratës tjetër<div className="castleHolder" id="leftCastle"/>
      </p>
    </div>
  );
}

export default MainImage;
