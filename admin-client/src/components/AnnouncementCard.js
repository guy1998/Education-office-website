import React from 'react';

function AnnouncementCard ({announcement, click}){
    return(
        <div className='announcementCard' key={announcement._id} onClick={()=>click(announcement)}>
            <p>{announcement.title}</p>
            <p><b>Data: </b>{announcement.date}</p>
        </div>
    );
}

export default AnnouncementCard;