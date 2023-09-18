import React, { useEffect, useState } from "react";
import "../styles/institutionPage.css";
import InstitutionFilter from "./InstitutionFilter";
import { retrieveInsitutions } from "../scirpts/institutions-scripts.js";
import InstitutionContainer from "./InstitutionContainer";
import MyModal from "./MyModal";
import AddInstitutionForm from "./AddInstitutionForm";

function InstitutionsPage() {
  const [institutions, setInstitutions] = useState([]);
  const [instiutionsCopy, setInstitutionsCopy] = useState([]);
  const [added, setAdded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(
    () => {
      retrieveInsitutions(data => {
        setInstitutions(data);
        setInstitutionsCopy(data);
      });
      setAdded(false);
      setDeleted(false);
      setEdited(false);
    },
    [added, deleted, edited]
  );

  return (
    <div className="institutionMain">
      <InstitutionFilter
        institutions={instiutionsCopy}
        setInstitutions={setInstitutions}
      />
      <div style={{ height: "85%", display: "flex", textAlign: "center" }}>
        <InstitutionContainer
          institutions={institutions}
          onDelete={() => setDeleted(true)}
          onEdit = {()=>setEdited(true)}
        />
      </div>
      <button
        className="addInstitutionButton"
        onClick={() => setShowAdd(true)}
      />
      <MyModal
        heading={"Shto nje institucion"}
        show={showAdd}
        onHide={() => setShowAdd(false)}
      >
        <AddInstitutionForm onAdd={() => setAdded(true)} />
      </MyModal>
    </div>
  );
}

export default InstitutionsPage;
