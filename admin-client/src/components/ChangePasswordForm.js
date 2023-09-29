import React, { useState } from "react";
import "../styles/settings.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {changePassword} from "../scirpts/user-scripts.js";
import {useSnackbar} from "notistack";

function ChangePasswordForm() {
  const [actual, setActual] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const notification = {
    add: enqueueSnackbar,
    close: closeSnackbar
  }
  const clearForm = ()=>{
    const inputs = document.querySelectorAll('input');
    setActual('');
    setNewPassword('');
    inputs.forEach(input=>{
      input.value = '';
    });
  }

  return (
    <form className="passwordForm">
      <FloatingLabel controlId="floatingPassword" label="Fjalekalimi aktual">
        <Form.Control
          type="password"
          placeholder="Password"
          autocomplete="new-password"
          onChange={(event)=>setActual(event.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        style={{ marginTop: "15px" }}
        controlId="floatingPassword"
        label="Fjalekalimi i ri"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          autocomplete="new-password"
          onChange={(event)=>setNewPassword(event.target.value)}
        />
      </FloatingLabel>
      <button
        className="confirmButton"
        style={{ margin: "20px auto" }}
        disabled={newPassword === "" || actual === ""}
        onClick={(event)=>{
          event.preventDefault();
          changePassword(actual, newPassword, notification);
          clearForm();
        }}
      >
        Konfirmo
      </button>
    </form>
  );
}

export default ChangePasswordForm;
