import React from "react";
import "../styles/singleFilePages.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { addLegislation } from "../scirpts/legislation-scripts";

function AddLegislationForm({onAdd}) {

    const [title, setTitle] = useState('');
    const [pdf, setPdf] = useState(null);
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    const clearForm = ()=>{
      setPdf(null);
      setTitle('');
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input)=>{
        input.value = '';
      })
    }

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
            onChange={(event)=>{setTitle(event.target.value)}}
          />
        </FloatingLabel>
        <label htmlFor="pdfUploader" className="fileLabel">
          <div className="logoDivInUploader"/>
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
          disabled={
            title === '' ||
            !pdf
          }
          style={{marginLeft: "45px"}}
          onClick={(event)=>{
            event.preventDefault();
            addLegislation({title: title}, pdf, {
                add: (message, variant)=>{
                    enqueueSnackbar(message, variant);
                    onAdd();
                },
                close: closeSnackbar
            });
            clearForm();
          }}
        >
          Konfirmo
        </button>
      </form>
    </div>
  );
}

export default AddLegislationForm;
