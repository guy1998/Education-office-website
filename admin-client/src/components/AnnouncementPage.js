import React, { useEffect, useState } from "react";
import { getAnnouncements } from "../scirpts/announcements-scripts";
import "../styles/announcementPage.css";
import AddAnnouncementForm from "./AddAnnouncementForm";
import AnnouncementList from "./AnnouncementList";
import AnnouncementReader from "./AnnouncementReader";
import Loading from "./Loading.js";

function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [edited, setEdited] = useState(false);

  const openForm = () => {
    setAdding(true);
  };

  const closeForm = () => {
    setAdding(false);
  };

  const onAdd = () => {
    setAdded(true);
  };

  const onSelect = (announcement)=>{
    setSelectedAnnouncement(announcement);
  }

  const onDelete = ()=>{
    setDeleted(true);
    setSelectedAnnouncement(null);
  }

  const onEdit = (newInfo)=>{
    setSelectedAnnouncement(newInfo);
    setEdited(true);
  }

  useEffect(
    () => {
      setLoading(true);
      getAnnouncements(data => {
        setAnnouncements(data);
        setLoading(false);
      });
      setDeleted(false);
      setAdded(false);
      setEdited(false);
    },
    [deleted, added, edited]
  );

  return loading
    ? <Loading />
    : <div className="announcementMain">
        {adding && <AddAnnouncementForm onClose={closeForm} onAdd={onAdd} />}
        {!adding && <AnnouncementReader announcement={selectedAnnouncement} onDelete={onDelete} onEdit={onEdit}/>}
        <AnnouncementList announcements={announcements} openForm={openForm} select={onSelect}/>
      </div>;
}

export default AnnouncementPage;
