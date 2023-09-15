import React, { useEffect, useState } from "react";
import "../styles/institutionPage.css";
import InstitutionFilter from "./InstitutionFilter";
import { retrieveInsitutions } from "../scirpts/institutions-scripts.js";
import InstitutionContainer from "./InstitutionContainer";
import MyModal from "./MyModal";
import AddInstitutionForm from "./AddInstitutionForm";

function InstitutionsPage() {
  const [institutions, setInstitutions] = useState([]);
  const [added, setAdded] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    retrieveInsitutions(data => setInstitutions(data));
    setAdded(false);
  }, [added]);

  return (
    <div className="institutionMain">
      <InstitutionFilter />
      <div style={{height: '85%', display:'flex', textAlign: 'center'}}>
        <InstitutionContainer institutions={institutions}/>
      </div>
      <button className="addInstitutionButton" onClick={()=>setShowAdd(true)}></button>
      <MyModal heading={'Shto nje institucion'} show={showAdd} onHide={()=>setShowAdd(false)}>
        <AddInstitutionForm onAdd={()=>setAdded(true)}/>
      </MyModal>
    </div>
  );
}

export default InstitutionsPage;
