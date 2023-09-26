import React, { useState } from "react";
import { addNews } from "../scirpts/news-scripts";
import { useSnackbar } from "notistack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function AddNewsForm({ onAdd }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const addNotification = {
    add: (message, variant) => {
      enqueueSnackbar(message, variant);
      clearForm();
      onAdd();
    },
    close: closeSnackbar
  };
  const [news, setNews] = useState({
    title: "",
    description: "",
    date: new Date().toDateString()
  });
  const [photo, setPhoto] = useState(null);
  const onChange = (fieldName, newValue)=>{
    let replica = news;
    replica[fieldName] = newValue;
    setNews(replica);
  }
  const clearForm = ()=>{
    setPhoto(null);
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input=>{
      input.value = '';
    });
    const textarea = document.querySelector('textarea');
    textarea.value = '';
  }

  return (
    <form className="newsForm">
      <FloatingLabel
        controlId="floatingInput"
        label="Titulli"
        className="mb-3 formItem"
      >
        <Form.Control
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
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "250px", margin: "0 0 15px 0", resize: "none" }}
          onChange={event => onChange('description', event.target.value)}
        />
      </FloatingLabel>
      <label htmlFor="logoImg" className="fileLabel">
        <div />
        <p className="labelWriting">
          {photo ? photo.name : "Imazhi"}
        </p>
      </label>
      <input
        type="file"
        id="logoImg"
        onChange={event => setPhoto(event.target.files[0])}
      />
      <button
        className="confirmButton"
        disabled={!photo || news.title === "" || news.description === ""}
        onClick={(event)=>{
            event.preventDefault()
            addNews(news, photo, addNotification);
        }}
      >
        Konfirmo
      </button>
    </form>
  );
}

export default AddNewsForm;
