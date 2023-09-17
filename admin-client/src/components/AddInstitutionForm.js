import "../styles/institutionPage.css";
import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addInstitution, onChange } from "../scirpts/institutions-scripts";
import { useSnackbar } from "notistack";

function AddInstitutionForm({ onAdd }) {
  const [newInstitution, setNewInstitution] = useState({
    name: "",
    type: "",
    area: "",
    address: "",
    director: "",
    description: ""
  });
  const [photo, setPhoto] = useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const clearForm = ()=>{
    setPhoto(null);
    const formItems = document.querySelectorAll('input');
    formItems.forEach(item=>{
        item.value = '';
    })
    const selects = document.querySelectorAll('select');
    selects.forEach(item=>{
        item.selectedIndex = 0;
    })
    const textarea = document.querySelector('textarea');
    textarea.value = '';
  }

  return (
    <div className="institutionFormDiv">
      <form className="institutionForm">
        <FloatingLabel
          controlId="floatingInput"
          label="Emri i institucionit"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event =>
              onChange(event, "name", newInstitution, setNewInstitution)}
          />
        </FloatingLabel>
        <label htmlFor="logoImg" className="fileLabel">
          <div />
          <p className="labelWriting">
            {photo ? photo.name : "Imazhi"}
          </p>
        </label>
        <input type="file" id="logoImg" onChange={(event)=>setPhoto(event.target.files[0])}/>
        <Form.Select
          size="lg"
          className="selector"
          onChange={event =>
            onChange(event, "type", newInstitution, setNewInstitution)}
        >
          <option value={'default'}>Tipi i institucionit</option>
          <option>9-vjecare</option>
          <option>Gjimnaz</option>
          <option>Shkolle profesionale</option>
          <option>Shkolle artistike</option>
        </Form.Select>
        <Form.Select
          size="lg"
          className="selector"
          onChange={event =>
            onChange(event, "area", newInstitution, setNewInstitution)}
        >
          <option value={'default'}>Lagjia</option>
          <option>30 vjetori</option>
          <option>Clirim</option>
          <option>Deshmoret e kombit</option>
          <option>Uznove</option>
        </Form.Select>
        <FloatingLabel
          controlId="floatingInput"
          label="Adresa"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event =>
              onChange(event, "address", newInstitution, setNewInstitution)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Drejtuesi i institucionit"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event =>
              onChange(event, "director", newInstitution, setNewInstitution)}
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
            onChange={event =>
              onChange(event, "description", newInstitution, setNewInstitution)}
          />
        </FloatingLabel>
        <button
          className="confirmButton"
          disabled={
            !newInstitution.name ||
            !newInstitution.type ||
            !newInstitution.area ||
            !newInstitution.address ||
            !newInstitution.director ||
            !newInstitution.description ||
            !photo
          }
          onClick={(event) => {
            event.preventDefault();
            addInstitution(newInstitution, photo, {
              add: enqueueSnackbar,
              close: closeSnackbar
            });
            onAdd();
            setNewInstitution({
                name: "",
                type: "",
                area: "",
                address: "",
                director: "",
                description: ""
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

export default AddInstitutionForm;
