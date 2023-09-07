const { logOut } = require("./log-in-scripts.js");

export const getAnnouncements = proceeding => {
  fetch("https://localhost:5443/announcements/admin/retrieve", {
    credentials: "include",
  })
    .then(response => {
      if (response.status === 401) {
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

export const deleteAnnouncement = announcement => {};

export const addAnnouncement = announcement => {};

export const editAnnouncement = (announcement, newInfo) => {};
