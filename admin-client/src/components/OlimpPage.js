import React, { useState, useEffect } from "react";
import "../styles/exams.css";
import AddOlimpForm from "./AddOlimpForm";
import MyModal from "./MyModal";
import SingleFileCard from "./SingleFileCard";
import { retrieveExams } from "../scirpts/exam-scripts";

function OlimpPage() {
  const [onAdding, setOnAdding] = useState(false);
  const [olimps, setOlimps] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(
    () => {
      retrieveExams(data => {
        setOlimps(data);
      }, 2);
      setChanged(false);
    },
    [changed]
  );

  return (
    <div className="examMain olimpMain">
      {olimps.length
        ? olimps.map(olimp => {
            return (
              <SingleFileCard
                singleFileItem={olimp}
                code={2}
                onEdit={() => setChanged(true)}
                onDelete={() => setChanged(true)}
              />
            );
          })
        : <div style={{ display: "none" }} />}
      <button
        className="addInstitutionButton"
        onClick={() => setOnAdding(true)}
      />
      <MyModal
        show={onAdding}
        onHide={() => setOnAdding(false)}
        heading={"Shto njoftim mbi olimpiadat"}
      >
        <div>
          <AddOlimpForm onAdd={() => setChanged(true)} />
        </div>
      </MyModal>
    </div>
  );
}

export default OlimpPage;
