import Modal from "react-bootstrap/Modal";
import React from "react";

function ConfirmationModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Konfirmoni
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.messageconfirmation}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={()=>{
          props.onAccept();
          props.onHide();
        }}>Ne rregull</button>
        <button onClick={props.onHide}>Anullo</button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;