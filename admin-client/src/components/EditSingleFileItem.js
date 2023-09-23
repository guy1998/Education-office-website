import React, { useState } from "react";
import "../styles/singleFilePages.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {
  changePdf,
  editLegislation,
  deleteLegislation
} from "../scirpts/legislation-scripts.js";
import { useSnackbar } from "notistack";
import ConfirmationModal from "./ConfirmationModal";

function EditSingleFileItem({ singleFileItem, code, onDelete, onEdit }) {
  const [title, setTitle] = useState(singleFileItem.title);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const editNotification = {
    add: (message, variant) => {
      enqueueSnackbar(message, variant);
      onEdit();
    },
    close: closeSnackbar
  };
  const deleteNotification = {
    add: (message, variant) => {
      enqueueSnackbar(message, variant);
      onDelete();
    },
    close: closeSnackbar
  };

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
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </FloatingLabel>
      <button
        className="saveEdits"
        disabled={singleFileItem.title === title}
        onClick={event => {
          event.preventDefault();
          if (code === 1)
            editLegislation(singleFileItem, { title: title }, editNotification);
        }}
      />
      <label htmlFor="pdfChanger" className="changePdfButton" />
      <input
        type="file"
        id="pdfChanger"
        style={{ display: "none" }}
        onChange={event => {
          event.preventDefault();
          if (code === 1)
            changePdf(singleFileItem, event.target.files[0], editNotification);
        }}
      />
      <button
        className="deleteButton1"
        onClick={event => {
          event.preventDefault();
          setConfirmDeletion(true);
        }}
      />
      <ConfirmationModal
        show={confirmDeletion}
        messageconfirmation="Jeni te sigurt se doni ta fshini?"
        onHide={() => setConfirmDeletion(false)}
        onAccept={() => {
          if (code === 1) 
            deleteLegislation(singleFileItem, deleteNotification);
        }}
      />
    </div>
  );
}

export default EditSingleFileItem;
