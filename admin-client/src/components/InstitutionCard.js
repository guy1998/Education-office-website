import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/institutionPage.css";
import MyModal from "./MyModal";
import { deleteInstitution } from "../scirpts/institutions-scripts.js";
import { useSnackbar } from "notistack";
import ConfirmationModal from "./ConfirmationModal.js";

function InstitutionCard({ institution }) {
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
      <Card.Img
        className="cardImage"
        variant="top"
        src={"https://drive.google.com/uc?export=view&id=" + institution.photo}
        alt="Institution image"
      />
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
      <MyModal show={viewSchool} onHide={() => setViewSchool(false)}>
        <div>Ktu do jete shkolla</div>
      </MyModal>
      <ConfirmationModal
        show={confirmDelete}
        onHide={() => setConfirmDelete(false)}
        messageconfirmation={"A jeni te sigurte se doni ta fshini kete institucion?"}
        onAccept={() => {
          deleteInstitution(institution, {
            add: enqueueSnackbar,
            close: closeSnackbar
          });
        }}
      />
    </Card>
  );
}

export default InstitutionCard;
