import { logOut } from "./log-in-scripts";

export const filterInstitutions = filters => {};

export const retrieveInsitutions = proceeding => {
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
  setTimeout(() => {
    notification.close();
  }, 5000);

  if (!institution.name) {
    notification.add("Emri mungon!", { variant: "error" });
    return false;
  } else if (!institution.type) {
    notification.add("Tipi mungon", { variant: "error" });
    return false;
  } else if (!institution.area) {
    notification.add("Lagjia mungon", { variant: "error" });
    return false;
  } else if (!institution.address) {
    notification.add("Adresa mungon", { variant: "error" });
    return false;
  } else if (!institution.director) {
    notification.add("Drejtuesi mungon", { variant: "error" });
    return false;
  } else if (!institution.description) {
    notification.add("Pershkrimi mungon", { variant: "error" });
    return false;
  }

  return true;
};

export const addInstitution = (institution, notification) => {
  if (validateInstitution(institution, notification)) {
    fetch("https://localhost:5443/institutions/admin/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(institution),
      credentials: "include"
    })
      .then(response => {
        if (response.status === 200) {
          notification.add("Institucioni u shtua me sukses", {
            variant: "success"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else if (response.status === 401) {
          alert("Your session has expired!");
          logOut();
        } else {
          notification.add("Uups, dicka shkoi keq!", { variant: "error" });
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
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
      if (response.status === 200) {
        notification.add("Institucioni u fshi me sukses!", {
          variant: "success"
        });
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
      if (response.status === 200) {
        notification.add("Institucioni u ndryshua me sukses!", {
          variant: "success"
        });
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
    })
    .catch(err => {
      console.log(err);
    });
};

export const onChange = (
  event,
  fieldName,
  newInstitution,
  setNewInstitution
) => {
  let replica = { ...newInstitution };
  if (fieldName === "type") {
    if (event.target.value !== "Tipi i institucionit")
      replica[fieldName] = event.target.value;
    else replica[fieldName] = "";
  } else if (fieldName === "area") {
    if (event.target.value !== "Lagjia")
      replica[fieldName] = event.target.value;
    else replica[fieldName] = "";
  } else {
    replica[fieldName] = event.target.value;
  }
  setNewInstitution(replica);
};
