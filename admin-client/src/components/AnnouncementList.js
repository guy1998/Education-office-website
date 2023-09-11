import React from "react";
import AnnouncementCard from "./AnnouncementCard";

function AnnouncementList({ announcements, openForm, select }) {

  return (
    <div className="announcementListContainer">
      <div className="announcementList">
        {announcements
          ? announcements.map(announcement => {
              return <AnnouncementCard announcement={announcement} click={select}/>;
            })
          : <p>No announcements</p>}
      </div>
      <button className="addingButton" onClick={openForm}>Shto</button>
    </div>
  );
}

export default AnnouncementList;
