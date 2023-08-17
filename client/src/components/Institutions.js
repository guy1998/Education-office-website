import { useEffect, useState } from "react";
import "../styles/institutions.css";
import InstitutionCard from "./InstitutionCard";

const images = require.context("../images");

const getInstitutions = () => {
  // let institutions = []
  let institutions = [
    {
      id: 1,
      name: "Mehmet Ali Vrioni",
      area: "Berat",
      type: "9-vjecare",
      nrOfStudents: 300,
      address: "Rruga se mbaj mend",
      principle: "I really have no idea",
      mainPic: "./ironman.jpg",
      logo: "./ironman.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      id: 1,
      name: "22 Tetori",
      area: "Berat",
      type: "9-vjecare",
      nrOfStudents: 700,
      address: "Rruga se mbaj mend",
      principle: "I really have no idea",
      mainPic: "./ironman.jpg",
      logo: "./ironman.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
    {
      id: 1,
      name: "28 Nentori",
      area: "Berat",
      type: "9-vjecare",
      nrOfStudents: 300,
      address: "Rruga se mbaj mend",
      principle: "I really have no idea",
      mainPic: "./ironman.jpg",
      logo: "./ironman.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    },
  ];

  for (let i = 0; i < 10; i++)
    institutions.push({
      id: i + 3,
      name: "28 Nentori",
      area: "Berat",
      type: "9-vjecare",
      nrOfStudents: 300,
      address: "Rruga se mbaj mend",
      principle: "I really have no idea",
      mainPic: "./ironman.jpg",
      logo: "./ironman.jpg",
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    });

  return institutions;
};

function Institutions() {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const array = getInstitutions();
    setInstitutions(array);
    if (selectedInstitution === null) {
      setSelectedInstitution(array[0]);
      setLoading(false);
    }
  }, []);

  const changeSelectedInstitution = (newInstitution) => {
    setSelectedInstitution(newInstitution);
  };

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <div className="sectionContainer">
      <div className="headingContainer">
        <h1 className="sectionTitle">INSTITUCIONET</h1>
        <div className="headingLine"></div>
      </div>
      <div className="mainContainer">
        <div className="specificsOfThings">
          {!selectedInstitution ? (
            <p>Asnje institucion</p>
          ) : (
            <>
              <img
                src={images(selectedInstitution.mainPic)}
                className="mainPic"
              ></img>
              <h2 style={{ margin: "10px 2px" }}>
                {selectedInstitution.name} ({selectedInstitution.type})
              </h2>
              <p>
                <b>Drejtori i institucionit:</b> {selectedInstitution.principle}
              </p>
              <div className="schoolAddress">
                <p>{selectedInstitution.address}</p>
              </div>
              <div className="schoolDescription">
                <p>{selectedInstitution.description}</p>
              </div>
            </>
          )}
        </div>
        <div className="listOfThings">
          {institutions.length > 0 ? (
            institutions.map((institution, index) => {
              return (
                <InstitutionCard
                  institution={institution}
                  handleClick={changeSelectedInstitution}
                  isSelected={index === 0}
                />
              );
            })
          ) : (
            <p>Asnje institucion</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Institutions;
