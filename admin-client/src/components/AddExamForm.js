import React, { useState } from "react";
import { useSnackbar } from "notistack";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addExam } from "../scirpts/exam-scripts";

function AddExamForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [type, setType] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const clearForm = () => {
    setPdf(null);
    setTitle("");
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
      input.value = "";
    });
    const selects = document.querySelectorAll("select");
    selects.forEach(item => {
      item.selectedIndex = 0;
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
        <Form.Select
          size="lg"
          className="selector"
          onChange={event => {
            if (event.target.value !== "default")
              setType(event.target.value);
            else setType("");
          }}
        >
          <option value={"default"}>Tipi i provimit</option>
          <option value="matura">Matura shteterore</option>
          <option value="minimatura">Provimi i lirimit</option>
        </Form.Select>
        <button
          className="confirmButton"
          disabled={title === "" || !pdf || type === ""}
          style={{ marginLeft: "45px" }}
          onClick={event => {
            event.preventDefault();
            addExam({ title: title, type: type }, pdf, {
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

export default AddExamForm;
