import React, { useState } from "react";
import "../styles/staff.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addStaff } from "../scirpts/staff-scripts";

function AddStaffForm({ notification }) {
  const [newStaff, setNewStaff] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    position: "",
    email: "",
    linkedin: ""
  });
  const onChange = (fieldName, newValue) => {
    let replica = { ...newStaff };
    if (fieldName === "position" && newValue === "default") {
      replica[fieldName] = "";
    } else {
      replica[fieldName] = newValue;
    }
    setNewStaff(replica);
  };
  const clearForm = () => {
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      input.value = "";
    });
    const select = document.querySelector("select");
    select.selectedIndex = 0;
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
            onChange={event => onChange("surname", event.target.value)}
          />
        </FloatingLabel>
        <Form.Select
          size="lg"
          className="selector"
          onChange={event => onChange("position", event.target.value)}
        >
          <option value={"default"}>Pozicioni</option>
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
            placeholder="name@example.com"
            onChange={event => onChange("linkedin", event.target.value)}
          />
        </FloatingLabel>
        <button
          className="confirmButton"
          disabled={
            newStaff.name === "" ||
            newStaff.surname === "" ||
            newStaff.position === "" ||
            newStaff.email === "" ||
            newStaff.phoneNumber === ""
          }
          onClick={event => {
            event.preventDefault();
            const result = addStaff(newStaff, notification);
            if (result) {
              clearForm();
            }
          }}
        >
          Konfirmo
        </button>
      </form>
    </div>
  );
}

export default AddStaffForm;
