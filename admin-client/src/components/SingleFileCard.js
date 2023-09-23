import React, { useState } from "react";
import "../styles/singleFilePages.css";
import Collapse from "react-bootstrap/Collapse";
import EditSingleFileItem from "./EditSingleFileItem";

function SingleFileCard({ singleFileItem, code, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="singleCardContainer">
      <div
        id={singleFileItem._id}
        className="singleFileCard"
        onClick={event => {
          setOpen(!open);
          document
            .getElementById(singleFileItem._id)
            .classList.toggle("opened");
        }}
      >
        <p>
          {singleFileItem.title}
        </p>
      </div>
      <Collapse in={open}>
        <div className="example-collapse-text">
          <EditSingleFileItem
            singleFileItem={singleFileItem}
            code={code}
            onEdit={onEdit}
            onDelete={() => {
              onDelete();
            }}
          />
        </div>
      </Collapse>
    </div>
  );
}

export default SingleFileCard;
