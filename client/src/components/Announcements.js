import { useEffect, useState } from "react";
import "../styles/announcements.css";
import AnnouncementCard from "./AnnouncementCard";

const getAnnouncements = async ()=>{

  const response = await fetch("http://localhost:5000/announcements", {
    method: "GET"
  })
  
  if(response.ok){
    const data = await response.json();
    return data;
  }else{
    return [];
  }

};

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    getAnnouncements().then((data)=>{
      setAnnouncements(data);
      if (selectedAnnouncement === null) {
        setSelectedAnnouncement(data[0]);
        setLoading(false);
      }
    });

    return ()=>{
      controller.abort(()=>{
        console.log("announcements aborted")
      })
    }
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="sectionContainer">
      <div className="headingContainer">
        <h1 className="sectionTitle">NJOFTIMET</h1>
        <div className="headingLine"></div>
      </div>
      <div className="mainContainer">
      {
        !selectedAnnouncement ? <p style={{margin:"auto"}}>Asnje njoftim</p>: (<div className="specificsOfThings">
        <h2>{selectedAnnouncement.title}</h2>
        <div className="announcementDescription">
          <p>{selectedAnnouncement.description}</p>
        </div>
        <button className="button">
          <b>PDF</b>
        </button>
      </div> )
      }
        <div className="listOfThings">
            {
            announcements.length > 0 ?  (announcements.map((announcement, index)=>{
              return <AnnouncementCard announcement={announcement} handleClick={()=>setSelectedAnnouncement(announcement)} isSelected={index == 0} />
          })) : <p style={{margin: "auto"}}>Asnje njoftim</p>
            }
        </div>
      </div>
    </div>
  );
}

export default Announcements;
