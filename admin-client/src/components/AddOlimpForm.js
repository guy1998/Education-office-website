import React, { useState } from "react";
import { useSnackbar } from "notistack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addExam } from "../scirpts/exam-scripts";

function AddOlimpForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const clearForm = () => {
    setPdf(null);
    setTitle("");
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      input.value = "";
    });
  };

  return (
    <div className="legislationFormDiv">
      <form className="legislationForm">
        <FloatingLabel
          controlId="floatingInput"
          label="Titulli"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
        </FloatingLabel>
        <label htmlFor="pdfUploader" className="fileLabel">
          <div className="logoDivInUploader" />
          <p className="labelWriting">
            {pdf ? pdf.name : "Dokumenti PDF"}
          </p>
        </label>
        <input
          type="file"
          id="pdfUploader"
          onChange={event => setPdf(event.target.files[0])}
        />
        <button
          className="confirmButton"
          disabled={title === "" || !pdf}
          style={{ marginLeft: "45px" }}
          onClick={event => {
            event.preventDefault();
            addExam({ title: title, type: "olimp" }, pdf, {
              add: (message, variant) => {
                enqueueSnackbar(message, variant);
                onAdd();
                clearForm();
              },
              close: closeSnackbar
            });
          }}
        >
          Konfirmo
        </button>
      </form>
    </div>
  );
}

export default AddOlimpForm;
