import React from "react";
import "../styles/singleFilePages.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function EditSingleFileItem({ singleFileItem, code }) {
  return (
    <div className="editSingle">
      <FloatingLabel
        controlId="floatingInput"
        label="Titulli"
        className="mb-3 formItem titleInput"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={event => console.log(event)}
        />
      </FloatingLabel>
      <button className="saveEdits"></button>
      <button className="changePdfButton"></button>
      <button className="deleteButton1"></button>
    </div>
  );
}

export default EditSingleFileItem;
