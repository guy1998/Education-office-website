import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "../styles/message.css";
import { sendMessage } from "../scripts/messages-scripts.js";
import { useSnackbar } from "notistack";

function ComplaintForm({ animationClass }) {
  const [newMessage, setNewMessage] = useState({
    header: "",
    body: "",
    writer: "",
    email: "",
    date: new Date().toDateString()
  });
  const onChange = (fieldName, newValue) => {
    let replica = { ...newMessage };
    replica[fieldName] = newValue;
    setNewMessage(replica);
  };

  return (
    <form>
      <FloatingLabel
        controlId="floatingInput"
        label="Subjekti"
        className={"mb-3 formItem " + animationClass}
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={event => onChange("header", event.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        style={{animationDelay: '1s'}}
        controlId="floatingTextarea2"
        className={"formItem " + animationClass}
        label="Përshkrimi"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "250px", margin: "0 0 15px 0", resize: "none" }}
          onChange={event => onChange("body", event.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        style={{animationDelay: '1.5s'}}
        controlId="floatingInput"
        label="Emri i plotë"
        className={"mb-3 formItem " + animationClass}
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={event => onChange("writer", event.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        style={{animationDelay: '2s'}}
        controlId="floatingInput"
        label="Adresa e-mail"
        className={"mb-3 formItem " + animationClass}
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={event => onChange("email", event.target.value)}
        />
      </FloatingLabel>
      <button
        style={{animationDelay: '2.5s'}}
        className={"button1 " + animationClass}
        onClick={event => {
          event.preventDefault();
        }}
        disabled={
          newMessage.header === "" ||
          newMessage.body === "" ||
          newMessage.writer === "" ||
          newMessage.email
        }
      >
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <span>Send</span>
      </button>
    </form>
  );
}

export default ComplaintForm;
