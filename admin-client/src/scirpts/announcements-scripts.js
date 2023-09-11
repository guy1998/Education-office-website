const { logOut } = require("./log-in-scripts.js");

export const getAnnouncements = proceeding => {
  fetch("https://localhost:5443/announcements/admin/retrieve", {
    credentials: "include"
  })
    .then(response => {
      if (response.status === 401) {
        alert("Your session has expired");
        logOut();
      } else if (response.status === 200) {
        return response.json();
      } else {
        alert("Something went wrong!");
      }
    })
    .then(data => {
      proceeding(data);
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteAnnouncement = announcement => {
  fetch("https://localhost:5443/announcements/admin/delete", {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(announcement),
    credentials: 'include'
  })
  .then(response=>{
    if(response.status === 401)
      logOut();
    else if(response.status === 200){
      alert('Njoftimi u fshi me sukses!');
    }else{
      alert('Dicka shkoi keq! Kontakto informacionin!');
    }
  })
};

export const validateAnnouncement = (announcement)=>{
  if(!announcement.title){
    alert('Mungon titulli!');
    return false;
  }else if(!announcement.description){
    alert('Mungon pershkrimi!');
    return false;
  }

  return true;
}

export const addAnnouncement = announcement => {
  fetch("https://localhost:5443/announcements/admin/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(announcement),
    credentials: 'include'
  }).then(response => {
    if (response.status === 200) {
      alert("Njoftimi u shtua me sukses!");
    } else if (response.status === 401) {
      alert("Your session has expired");
      logOut();
    }else{
      alert('Ooops! Dicka shkoi keq!');
    }
  });
};

export const editAnnouncement = (announcement, newInfo) => {};
