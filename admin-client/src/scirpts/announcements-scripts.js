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

export const deleteAnnouncement = (announcement, onDelete, notification) => {
  fetch("https://localhost:5443/announcements/admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(announcement),
    credentials: "include"
  }).then(response => {
    if (response.status === 401) logOut();
    else if (response.status === 200) {
      onDelete();
      notification.add("Njoftimi u fshi me sukses!", { variant: "success" });
      setTimeout(() => {
        notification.close();
      }, 5000);
    } else {
      notification.add("Uuups, dicka shkoi keq!", { variant: "error" });
      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  });
};

export const validateAnnouncement = (announcement, notification) => {
  if (!announcement.title) {
    notification.add("Mungon titulli!", { variant: "error" });
    setTimeout(() => {
      notification.close();
    }, 5000);
    return false;
  } else if (!announcement.description) {
    notification.add("Mungon pershkrimi", { variant: "error" });
    setTimeout(() => {
      notification.close();
    }, 5000);
    return false;
  }

  return true;
};

export const addAnnouncement = (announcement, notification) => {
  fetch("https://localhost:5443/announcements/admin/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(announcement),
    credentials: "include"
  }).then(response => {
    if (response.status === 200) {
      notification.add("Njoftimi u shtua me sukses!", { variant: "success" });
      setTimeout(() => {
        notification.close();
      }, 5000);
    } else if (response.status === 401) {
      alert("Your session has expired");
      logOut();
    } else {
      notification.add("Uups, dicka shkoi keq!", { variant: "error" });
      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  });
};

export const editAnnouncement = (
  announcement,
  newInfo,
  notification,
  successFunction
) => {
  fetch("https://localhost:5443/announcements/admin/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ _id: announcement._id, newInfo: newInfo }),
    credentials: "include"
  }).then(response => {
    if (response.status === 401) {
      alert("Your session has expired");
      logOut();
    } else if (response.status === 200) {
      successFunction({ _id: announcement.id, ...newInfo });
      notification.add("Njoftimi u modifikua!", { variant: "success" });
      setTimeout(() => {
        notification.close();
      }, 5000);
    } else {
      notification.add("uupss, dicka shkoi keq!", { variant: "error" });
      setTimeout(() => {
        notification.close();
      }, 5000);
    }
  });
};
