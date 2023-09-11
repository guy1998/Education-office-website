import React, { useState } from "react";
import { deleteAnnouncement } from "../scirpts/announcements-scripts.js";
import EditAnnouncementForm from "./EditAnnouncementForm.js";
import { useSnackbar } from "notistack";

function AnnouncementReader({ announcement, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const onClose = () => {
    setEditing(false);
  };

  return !announcement
    ? <div className="announcementPlaceholder" />
    : !editing
      ? <div className="readingBox">
          <div className="readerHeader">
            <h4>
              {announcement.title}
            </h4>
          </div>
          <div className="readerMsgInfo">
            <p className="shortInfo">
              <b>Data: </b>
              {announcement.date}
            </p>
          </div>
          <div className="readerBody">
            <p>
              {announcement.description}
            </p>
          </div>
          <div className="footDiv">
            <p id="linku">
              <b>Linku: </b>
              {announcement.link}
            </p>
            <div className="divButton">
              <button className="editButton" onClick={() => setEditing(true)} />
              <button
                className="deleteButton1"
                onClick={() => deleteAnnouncement(announcement, onDelete, {add: enqueueSnackbar, close: closeSnackbar})}
              />
            </div>
          </div>
        </div>
      : <EditAnnouncementForm
          announcement={announcement}
          onClose={onClose}
          onEdit={onEdit}
        />;
}

export default AnnouncementReader;
