import React from "react";
import "../styles/navbar.css";
import HomePageCard from "./HomePageCard";
import institutionImg from "../images/bank.png";
import complaintImg from "../images/report.png";
import staffImg from "../images/group.png";

function HomePageCardContainer() {
  return (
    <div className="cardContainer">
      <HomePageCard
        title="Institucionet"
        content={
          "Berati është një nga qytetet e para me arsim modern. Zbuloni institucionet e sotme të arsimit!"
        }
        img={institutionImg}
      />
      <HomePageCard
        title="Stafi"
        content={"Njihuni me stafin tuaj të arsimit! Jemi një 'click' larg!"}
        img={staffImg}
        id='firstCard'
        href={'staffDivision'}
      />
      <HomePageCard
        title="Kërkesat"
        content={
          "Bëjeni zërin tuaj të degjohet! Formuloni tani shtqetësimin tuaj! Për të tjerat mendojmë ne."
        }
        img={complaintImg}
        id='secondCard'
      />
    </div>
  );
}

export default HomePageCardContainer;
