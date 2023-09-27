import React, { useState } from "react";
import "../styles/staff.css";
import ConfirmationModal from "./ConfirmationModal";
import { deleteStaff } from "../scirpts/staff-scripts";
import MyModal from "./MyModal";
import EditStaffForm from "./EditStaffForm";

function StaffCard({ member, notification }) {
  const [confirming, setConfirming] = useState(false);
  const [editing, setEditing] = useState(false);

  return (
    <>
    <div
      class="ribbon"
      onClick={event => {
        if (event.target !== document.getElementById("deleteStaffButton")){
          setEditing(true);
        }
      }}
    >
      <div className="ribbonHeadingDiv">
        <h1>
          {member.name + " " + member.surname}
        </h1>
        <button
          className="deleteButton1"
          id="deleteStaffButton"
          onClick={event => {
            event.stopPropagation();
            setConfirming(true);
          }}
        />
      </div>
      <h3>
        {member.position}
      </h3>
      <p className="contacts phoneNumber">
        {member.phoneNumber}
      </p>
      <p className="contacts email">
        {member.email}
      </p>
      <p className="contacts linkedin">
        {member.linkedin ? member.linkedin : "I padisponueshem"}
      </p>
    </div>
    <ConfirmationModal
        show={confirming}
        onHide={() => setConfirming(false)}
        onAccept={() => {
          deleteStaff(member._id, notification);
        }}
        messageconfirmation="Deshironi ta fshini kete anetar te stafit?"
      />
      <MyModal
        show={editing}
        onHide={() => setEditing(false)}
        heading="Perditeso anetarin"
      >
        <EditStaffForm
          member={member}
          notification={notification}
          onClose={() => setEditing(false)}
        />
      </MyModal>
      </>
  );
}

export default StaffCard;
