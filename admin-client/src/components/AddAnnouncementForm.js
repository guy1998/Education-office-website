import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {
  validateAnnouncement,
  addAnnouncement
} from "../scirpts/announcements-scripts.js";

function AddAnnouncementForm({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  return (
    <div className="announcementFormContainer">
      <div className="formHeader">
        <button className="backButton" onClick={onClose} />
        <h1>Shtoni njoftimin tuaj</h1>
      </div>
      <form className="announcementForm">
        <FloatingLabel
          controlId="floatingInput"
          label="Titulli"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event => setTitle(event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea2"
          className="formItem"
          label="Pershkrimi"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "250px", margin: "0 0 15px 0", resize: "none" }}
            onChange={event => setDescription(event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Linku per dokumentin"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event => setLink(event.target.value)}
          />
        </FloatingLabel>
      </form>
      <button
        className="confirmButton"
        disabled={title === "" || description === ""}
        onClick={() => {
          const announcement = {
            title: title,
            description: description,
            link: link,
            date: (new Date()).toDateString()
          };
          if (validateAnnouncement(announcement)) {
            addAnnouncement(announcement);
            onAdd();
            onClose();
          }
        }}
      >
        Konfirmo
      </button>
    </div>
  );
}

export default AddAnnouncementForm;
