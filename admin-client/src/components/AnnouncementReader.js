import React, { useState } from "react";
import { deleteAnnouncement } from "../scirpts/announcements-scripts.js";

function AnnouncementReader({ announcement }) {
  return !announcement
    ? <div className="announcementPlaceholder" />
    : <div className="readingBox">
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
            <button className="editButton" />
            <button className="deleteButton1" onClick={()=>deleteAnnouncement(announcement)}/>
          </div>
        </div>
      </div>;
}

export default AnnouncementReader;
