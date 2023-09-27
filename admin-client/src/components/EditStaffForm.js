import React, { useState } from "react";
import "../styles/staff.css";
import { editStaff } from "../scirpts/staff-scripts";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function EditStaffForm({ member, notification, onClose }) {
  const [newInfo, setNewInfo] = useState({
    ...member
  });
  const onChange = (fieldName, newValue) => {
    let replica = {...newInfo};
    replica[fieldName] = newValue;
    setNewInfo(replica);
  };

  return (
    <div className="formDiv">
      <form className="institutionForm">
        <FloatingLabel
          controlId="floatingInput"
          label="Emri"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            value={newInfo.name}
            onChange={event => onChange("name", event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Mbiemri"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            value={newInfo.surname}
            onChange={event => onChange("surname", event.target.value)}
          />
        </FloatingLabel>
        <Form.Select
          size="lg"
          className="selector"
          value={newInfo.position}
          onChange={event => onChange("position", event.target.value)}
        >
          <option>Drejtor</option>
          <option>Shef i burimeve njerezore</option>
          <option>Jurist</option>
          <option>Specialist</option>
        </Form.Select>
        <FloatingLabel
          controlId="floatingInput"
          label="Numri i telefonit"
          className="mb-3 formItem"
        >
          <Form.Control
            value={newInfo.phoneNumber}
            type="text"
            placeholder="name@example.com"
            onChange={event => onChange("phoneNumber", event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Adresa e-mail"
          className="mb-3 formItem"
        >
          <Form.Control
            value={newInfo.email}
            type="text"
            placeholder="name@example.com"
            onChange={event => onChange("email", event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Linku per LinkedIn"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            value={newInfo.linkedin}
            placeholder="name@example.com"
            onChange={event => onChange("linkedin", event.target.value)}
          />
        </FloatingLabel>
        <button
          className="confirmButton"
          disabled={
            newInfo.name === member.name &&
            newInfo.surname === member.surname &&
            newInfo.position === member.position &&
            newInfo.email === member.email &&
            newInfo.phoneNumber === member.phoneNumber &&
            newInfo.linkedin === member.linkedin
          }
          onClick={event => {
            event.preventDefault();
            const result = editStaff(member._id, newInfo, notification);
            onClose();
          }}
        >
          Konfirmo
        </button>
      </form>
    </div>
  );
}

export default EditStaffForm;
