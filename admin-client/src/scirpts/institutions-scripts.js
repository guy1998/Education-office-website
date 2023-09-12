import { logOut } from "./log-in-scripts";

export const filterInstitutions = filters => {};

export const retrieveInsituttions = proceeding => {
  fetch("https://localhost:5443/institutions/admin/retrieve", {
    credentials: "include"
  })
    .then(response => {
      if (response.status === 200) return response.json();
      else if (response.status === 401) {
        alert("Your session has expired!");
        logOut();
      }
    })
    .then(data => {
      proceeding(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const validateInstitution = (institution, notification) => {
  return true;
};

export const addInstitution = (institution, notification) => {
  fetch("https://localhost:5443/institutions/admin/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(institution),
    credentials: "include"
  })
    .then(response => {
      if (response.status === 200)
        notification.add("Institucioni u shtua me sukses", {
          variant: "success"
        });
      else if (response.status === 401) {
        alert("Your session has expired!");
        logOut();
      } else {
        notification.add("Uups, dicka shkoi keq!", { variant: "error" });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteInstitution = (institution, notification) => {
  fetch("https://localhost:5443/institutions/admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(institution),
    credentials: "include"
  })
    .then(response => {
      if (response.status === 200)
        notification.add("Institucioni u fshi me sukses!", {
          variant: "success"
        });
      else if (response.status === 401) {
        alert("Your session has expired");
        logOut();
      } else {
        notification.add("Uups, dicka shkoi keq!", { variant: "error" });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const editInstitution = (institution, newInfo, notification) => {
  fetch("https://localhost:5443/institutions/admin/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ _id: institution._id, newInfo: newInfo }),
    credentials: "include"
  })
    .then(response => {
      if (response.status === 200)
        notification.add("Institucioni u ndryshua me sukses!", {
          variant: "success"
        });
      else if (response.status === 401) {
        alert("Your session has expired");
        logOut();
      } else {
        notification.add("Uups, dicka shkoi keq!", { variant: "error" });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
