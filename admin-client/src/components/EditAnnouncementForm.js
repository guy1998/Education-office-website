import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {
  validateAnnouncement,
  editAnnouncement
} from "../scirpts/announcements-scripts.js";
import { useSnackbar } from "notistack";

function EditAnnouncementForm({ announcement, onClose, onEdit }) {
  const [title, setTitle] = useState(announcement.title);
  const [description, setDescription] = useState(announcement.description);
  const [link, setLink] = useState(announcement.link);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <div className="announcementFormContainer">
      <div className="formHeader">
        <button className="backButton" onClick={onClose} />
        <h1>Perditesoni njoftimin</h1>
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
            value={title}
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
            value={description}
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
            value={link}
          />
        </FloatingLabel>
      </form>
      <button
        className="confirmButton"
        disabled={
          title === announcement.title &&
          description === announcement.description &&
          link === announcement.link
        }
        onClick={() => {
          const newAnnouncement = {
            title: title,
            description: description,
            link: link,
            date: new Date().toDateString()
          };
          if (
            validateAnnouncement(newAnnouncement, {
              add: enqueueSnackbar,
              close: closeSnackbar
            })
          ) {
            editAnnouncement(
              announcement,
              newAnnouncement,
              {
                add: enqueueSnackbar,
                close: closeSnackbar
              },
              onEdit
            );
            onClose();
          }
        }}
      >
        Konfirmo
      </button>
    </div>
  );
}

export default EditAnnouncementForm;
