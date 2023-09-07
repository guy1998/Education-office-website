import React, { useEffect, useState } from "react";
import { getAnnouncements } from "../scirpts/announcements-scripts";

function AnnouncementPage(){

    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [deleted, setDeleted] = false;

    useEffect(()=>{
        getAnnouncements((data)=>{
            setAnnouncements(data)
        })
        setDeleted(false);
    }, [deleted])

    return(
            <div style={{display: 'flex', alignItems: "center", justifyContent: "center"}}>
                <h1>ANNOUNCEMENT PAGE</h1>
            </div>
    );
}

export default AnnouncementPage;