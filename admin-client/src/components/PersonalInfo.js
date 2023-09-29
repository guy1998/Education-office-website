import React, { useState } from "react";
import "../styles/settings.css";
import { editUser } from "../scirpts/user-scripts.js";
import MyModal from "./MyModal";
import ChangePasswordForm from "./ChangePasswordForm";

function PersonalInfo({notification}) {
  const [newInfo, setNewInfo] = useState({
    ...JSON.parse(localStorage.getItem('user'))
  });
  const [passwordChanging, setPasswordChanging] = useState(false);
  const onChange = (fieldName, newValue) => {
    let replica = { ...newInfo };
    replica[fieldName] = newValue;
    setNewInfo(replica);
  };

  return (
    <div className="personalDiv">
      <h4>Te dhenat personale</h4>
      <div className="form">
        <label className="personalInfoLabels">Emri</label>
        <input
          className="input"
          type="text"
          value={newInfo.name}
          onChange={event => onChange("name", event.target.value)}
        />
        <span className="input-border" />
      </div>
      <div className="form">
        <label className="personalInfoLabels">Mbiemri</label>
        <input
          className="input"
          type="text"
          value={newInfo.surname}
          onChange={event => onChange("surname", event.target.value)}
        />
        <span className="input-border" />
      </div>
      <div className="form">
        <label className="personalInfoLabels">Emri i perdoruesit</label>
        <input
          className="input"
          type="text"
          value={newInfo.username}
          onChange={event => onChange("username", event.target.value)}
        />
        <span className="input-border" />
      </div>
      <div className="form">
        <label className="personalInfoLabels">E-mail</label>
        <input
          className="input"
          type="text"
          value={newInfo.email}
          onChange={event => onChange("email", event.target.value)}
        />
        <span className="input-border" />
      </div>
      <button
        className="profileChanger"
        disabled={
          newInfo.name === JSON.parse(localStorage.getItem('user')).name &&
          newInfo.email === JSON.parse(localStorage.getItem('user')).email &&
          newInfo.surname === JSON.parse(localStorage.getItem('user')).surname &&
          newInfo.username === JSON.parse(localStorage.getItem('user')).username
        }
        onClick={()=>{
          editUser(newInfo, notification);
        }}
      >
        Konfirmo
      </button>
      <button className="passwordChanger" onClick={()=>setPasswordChanging(true)}>Ndrysho fjalekalimin</button>
      <MyModal heading="Ndrysho fjalekalimin" show={passwordChanging} onHide={()=>setPasswordChanging(false)}>
        <ChangePasswordForm />
      </MyModal>
    </div>
  );
}

export default PersonalInfo;
