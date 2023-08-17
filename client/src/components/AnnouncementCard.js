import "../styles/announcements.css";

function AnnouncementCard({ announcement, handleClick, isSelected }) {
  return (
    <div
      className={
        isSelected ? "announcementCard selectedInstitution" : "announcementCard"
      }
      onClick={(event)=>{
        handleClick();
        let selectedItems = document.getElementsByClassName('selectedInstitution');
        if(selectedItems.length > 0){
            selectedItems[0].classList.toggle('selectedInstitution');
        }
        event.currentTarget.classList.toggle('selectedInstitution');
    }}
    >
    <div className="announcementTitle">
        <p><b>{announcement.title}</b></p>
    </div>
        <p><b>Date: </b> {announcement.date}</p>
    </div>
  );
}

export default AnnouncementCard;
