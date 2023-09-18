import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/institutionPage.css";
import MyModal from "./MyModal";
import { deleteInstitution, changePhoto } from "../scirpts/institutions-scripts.js";
import { useSnackbar } from "notistack";
import ConfirmationModal from "./ConfirmationModal.js";
import EditInstitutionForm from "./EditInstitutionForm";

function InstitutionCard({ institution, onDelete, onEdit }) {
  const [viewSchool, setViewSchool] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Card
      className={
        institution.name.length >= 26
          ? "institutionCard scrollable"
          : "institutionCard"
      }
    >
      <div className="imgDiv">
        <Card.Img
          className="cardImage"
          variant="top"
          src={
            "https://drive.google.com/uc?export=view&id=" + institution.photo
          }
          alt="Institution image"
        />
        <label id='photoLabel' htmlFor={institution._id}></label>
        <input type='file' id={institution._id} className="photoChanger" onChange={(event)=>{
          changePhoto(institution, event.target.files[0], {
            add: (message, variant) => {
              enqueueSnackbar(message, variant);
              onEdit();
            },
            close: closeSnackbar
          })
        }}></input>
      </div>
      <Card.Body>
        <div className="nameContainer">
          <Card.Title className="cardName">
            {institution.name}
          </Card.Title>
        </div>
        <div className="cardButtonDiv">
          <button className="viewCard" onClick={() => setViewSchool(true)}>
            Shiko
          </button>
          <button
            className="deleteCard"
            onClick={() => {
              setConfirmDelete(true);
            }}
          />
        </div>
      </Card.Body>
      <MyModal show={viewSchool} onHide={() => setViewSchool(false)} heading={"Perditeso institucionin"}>
        <EditInstitutionForm institution={institution} onEdit={onEdit}/>
      </MyModal>
      <ConfirmationModal
        show={confirmDelete}
        onHide={() => setConfirmDelete(false)}
        messageconfirmation={
          "A jeni te sigurte se doni ta fshini kete institucion?"
        }
        onAccept={() => {
          deleteInstitution(institution, {
            add: (message, variant) => {
              enqueueSnackbar(message, variant);
              onDelete();
            },
            close: closeSnackbar
          });
        }}
      />
    </Card>
  );
}

export default InstitutionCard;
