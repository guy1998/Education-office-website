import React, { useState } from "react";
import "../styles/institutionPage.css";
import { editInstitution } from "../scirpts/institutions-scripts";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useSnackbar } from "notistack";

function EditInstitutionForm({ institution, onEdit }) {
  const [newInfo, setNewInfo] = useState({ ...institution });
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

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
            value={newInfo.name}
            onChange={event => {
              let temp = { ...newInfo };
              temp.name = event.target.value;
              setNewInfo(temp);
            }}
          />
        </FloatingLabel>
        <Form.Select
          size="lg"
          className="selector"
          value={newInfo.type}
          onChange={event => {
            let temp = { ...newInfo };
            temp.type = event.target.value;
            setNewInfo(temp);
          }}
        >
          <option value={"9-vjecare"}>9-vjecare</option>
          <option value={"Gjimnaz"}>Gjimnaz</option>
          <option value={"Shkolle profesionale"}>Shkolle profesionale</option>
          <option vlaue={"Shkolle artistike"}>Shkolle artistike</option>
        </Form.Select>
        <Form.Select
          size="lg"
          className="selector"
          value={newInfo.area}
          onChange={event => {
            let temp = { ...newInfo };
            temp.area = event.target.value;
            setNewInfo(temp);
          }}
        >
          <option value={"30 vjetori"}>30 vjetori</option>
          <option value={"Clirim"}>Clirim</option>
          <option value={"Deshmoret e kombit"}>Deshmoret e kombit</option>
          <option value={"Uznove"}>Uznove</option>
        </Form.Select>
        <FloatingLabel
          controlId="floatingInput"
          label="Adresa"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            value={newInfo.address}
            onChange={event => {
              let temp = { ...newInfo };
              temp.address = event.target.value;
              setNewInfo(temp);
            }}
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
            value={newInfo.director}
            onChange={event => {
              let temp = { ...newInfo };
              temp.director = event.target.value;
              setNewInfo(temp);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea2"
          className="formItem"
          label="Pershkrimi"
          value={newInfo.description}
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "250px", margin: "0 0 15px 0", resize: "none" }}
            value={newInfo.description}
            onChange={event => {
              let temp = { ...newInfo };
              temp.description = event.target.value;
              setNewInfo(temp);
            }}
          />
        </FloatingLabel>
        <button
          className="confirmButton"
          disabled={
            newInfo.name === institution.name &&
            newInfo.description === institution.description &&
            newInfo.address === institution.address &&
            newInfo.area === institution.area &&
            newInfo.type === institution.type &&
            newInfo.director === institution.director
          }
          onClick={
            (event)=>{
                event.preventDefault();
                editInstitution(institution, newInfo, {
                    add: (message, variant)=>{
                        enqueueSnackbar(message, variant);
                        onEdit();
                    },
                    close: closeSnackbar
                })
            }
          }
        >
          Konfirmo
        </button>
      </form>
    </div>
  );
}

export default EditInstitutionForm;
