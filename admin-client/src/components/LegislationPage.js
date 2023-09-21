import React from "react";
import "../styles/singleFilePages.css";
import SingleFileCard from "./SingleFileCard";

function LegislationPage() {
  return (
    <div className="singleFileMain legislationMain">
      <SingleFileCard singleFileItem={{_id: 'kot1', title: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus'}}/>
      <SingleFileCard singleFileItem={{_id: 'kot2', title: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus'}}/>
      <button className="addInstitutionButton" />
    </div>
  );
}

export default LegislationPage;
