import React, { useEffect, useState } from "react";
import MyModal from "./MyModal.js";
import AddExamForm from "./AddExamForm";
import "../styles/exams.css";
import { retrieveExams } from "../scirpts/exam-scripts.js";
import SingleFileCard from "./SingleFileCard";

function ExamPage() {
  const [exams, setExams] = useState([]);
  const [onAdding, setOnAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(
    () => {
      console.log('getting');
      setExams([]);
      retrieveExams(data => {
        setExams(data);
      }, 1);
      setAdded(false);
      setDeleted(false);
      setEdited(false);
    },
    [added, deleted, edited]
  );

  return (
    <div className="examMain">
      {exams.map(exam => {
        return (
          <SingleFileCard
            singleFileItem={exam}
            code={2}
            onEdit={() => setEdited(true)}
            onDelete={()=>setDeleted(true)}
          />
        );
      })}
      <button
        className="addInstitutionButton"
        onClick={() => setOnAdding(true)}
      />
      <MyModal
        show={onAdding}
        onHide={() => setOnAdding(false)}
        heading={"Shto njoftim mbi provimet"}
      >
        <div>
          <AddExamForm onAdd={() => setAdded(true)} />
        </div>
      </MyModal>
    </div>
  );
}

export default ExamPage;
