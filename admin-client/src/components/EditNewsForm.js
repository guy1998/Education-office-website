import React, { useState } from "react";
import { editNews } from "../scirpts/news-scripts";
import { useSnackbar } from "notistack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "../styles/news.css";
import '../styles/announcementPage.css';

function EditNewsForm({ news, onEdit, onClose }) {
  const [newInfo, setNewInfo] = useState({...news});
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const editNotification = {
    add: (message, variant) => {
      enqueueSnackbar(message, variant);
      onEdit(newInfo);
    },
    close: closeSnackbar
  };
  const onChange = (fieldName, newValue) => {
    let replica = {...newInfo};
    replica[fieldName] = newValue;
    setNewInfo(replica);
  };

  return (
    <div className="announcementFormContainer">
      <div className="formHeader">
        <button className="backButton" onClick={onClose} />
        <h1>Perditesoni lajmin</h1>
      </div>
      <form className="newsForm">
        <FloatingLabel
          controlId="floatingInput"
          label="Titulli"
          className="mb-3 formItem"
        >
          <Form.Control
            value={newInfo.title}
            type="text"
            placeholder="name@example.com"
            onChange={event => onChange('title', event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea2"
          className="formItem"
          label="Pershkrimi"
        >
          <Form.Control
            value={newInfo.description}
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "250px", margin: "0 0 15px 0", resize: "none" }}
            onChange={event => onChange('description', event.target.value)}
          />
        </FloatingLabel>
        <button
          className="confirmButton"
          disabled={
            news.title === newInfo.title &&
            news.description === newInfo.description
          }
          onClick={event => {
            event.preventDefault();
            editNews(news, newInfo, editNotification);
          }}
        >
          Konfirmo
        </button>
      </form>
    </div>
  );
}

export default EditNewsForm;
