import React, { useState } from "react";
import "../styles/settings.css";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addUser } from "../scirpts/user-scripts";

function GenerateUser({notification}) {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: ""
  });
  const onChange = (fieldName, newValue) => {
    let replica = { ...user };
    replica[fieldName] = newValue;
    setUser(replica);
  };

  return (
    <div className="generateUser">
      <h3>Gjenero nje perdorues te ri</h3>
      <p className="instructions">
        Me poshte mund te gjeneroni nje perdorues te ri. Mjafton te shtoni
        informacionin e pergjithshem mbi perdoruesin, si emrin, mbiemrin dhe
        adresen e-mail. Emri i perdoruesit dhe fjalekalimi do te gjenerohen ne
        menyre automatike dhe te sigurte nga serveri i aplikacionit. Ju lutem,
        jini te kujdesshem ne vendosjen e adreses e-mail, sepse kjo adrese do te
        perdoret per te derguar te dhenat e llogarise te perdoruesi i ri.
      </p>
      <form className="generatingForm">
        <FloatingLabel
          controlId="floatingInput"
          label="Emri"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event => onChange("name", event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Mbiemri"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event => onChange("surname", event.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="E-mail"
          className="mb-3 formItem"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            onChange={event => onChange("email", event.target.value)}
          />
        </FloatingLabel>
        <button
          className="generateButton"
          disabled={
            user.name === "" || user.surname === "" || user.email === ""
          }
          onClick={(event)=>{
            event.preventDefault();
            addUser(user, notification);
          }}
        >
          Gjenero perdoruesin
          <span />
        </button>
      </form>
    </div>
  );
}

export default GenerateUser;
