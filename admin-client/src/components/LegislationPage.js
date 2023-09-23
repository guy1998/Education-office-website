import React, { useEffect, useState } from "react";
import "../styles/singleFilePages.css";
import SingleFileCard from "./SingleFileCard";
import MyModal from "./MyModal";
import { retrieveLegislation } from "../scirpts/legislation-scripts.js";
import AddLegislationForm from "./AddLegislationForm";

function LegislationPage() {
  const [legislations, setLegislations] = useState([]);
  const [added, setAdded] = useState(false);
  const [edited, setEdited] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [onAdding, setOnAdding] = useState(false);

  useEffect(
    () => {
      console.log('getting');
      setLegislations([]);
      retrieveLegislation(data => setLegislations(data));
      setEdited(false);
      setAdded(false);
      setDeleted(false);
    },
    [added, edited, deleted]
  );

  return (
    <div className="singleFileMain legislationMain">
      {legislations.length
        ? legislations.map(legislation => {
            return <SingleFileCard singleFileItem={legislation} code={1} onEdit={()=>setEdited(true)} onDelete={()=>setDeleted(true)}/>;
          })
        : <div style={{ display: "none" }} />}
      <button className="addInstitutionButton" onClick={()=>setOnAdding(true)}/>
       <MyModal show={onAdding} onHide={()=>setOnAdding(false)} heading={"Shto legjislacion"}>
          <div>
            <AddLegislationForm onAdd={()=>setAdded(true)}/>
          </div>
       </MyModal>   
    </div>
  );
}

export default LegislationPage;
