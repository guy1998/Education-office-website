import { logOut } from "./log-in-scripts";
import { startLoading, stopLoading } from "./loading-controller";

export const retrieveLegislation = proceeding => {
  fetch("https://localhost:5443/legislation/admin/retrieve", {
    method: "GET",
    credentials: "include"
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        alert("Your session has expired!");
        logOut();
      } else {
        alert("Something went wrong!");
      }
    })
    .then(data => {
      proceeding(data);
    });
};

export const deleteLegislation = (legislation, notification) => {
  startLoading();
  fetch("https://localhost:5443/legislation/admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(legislation),
    credentials: "include"
  })
    .then(response => {
      stopLoading();
      if (response.status === 200) {
        notification.add("Legjislacioni u fshi me sukses!", {
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
      stopLoading();
      console.log(err);
    });
};

const validateLegislation = (legislation, notification) => {
  if (!legislation.title) {
    notification.add("Titulli mungon", { variant: "error" });
    return false;
  }

  return true;
};

export const addLegislation = (legislation, pdf, notification) => {
  if (validateLegislation(legislation, notification)) {
    startLoading();
    let combinedData = new FormData();
    combinedData.append("legislation", JSON.stringify(legislation));
    combinedData.append("pdf", pdf);
    fetch("https://localhost:5443/legislation/admin/add", {
      method: "POST",
      body: combinedData,
      credentials: "include"
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Legjislacioni u shtua me sukses", {
            variant: "success"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else if (response.status === 401) {
          alert("Your session has expired!");
          logOut();
        } else if (response.status === 403) {
          notification.add("Nuk mund te ngarkoni dokumenta qe nuk jane pdf!", {
            variant: "error"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else {
          notification.add("Uups, dicka shkoi keq!", { variant: "error" });
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      })
      .catch(err => {
        stopLoading();
        console.log(err);
      });
  }
};

export const changePdf = (legislation, pdf, notification) => {
  startLoading();
  let combinedData = new FormData();
  combinedData.append("legislation", JSON.stringify(legislation));
  combinedData.append("pdf", pdf);
  fetch("https://localhost:5443/legislation/admin/changePdf", {
    method: "PUT",
    body: combinedData,
    credentials: "include"
  })
    .then(response => {
      stopLoading();
      if (response.status === 200) {
        notification.add("Dokumenti u ndryshua me sukses", {
          variant: "success"
        });
        setTimeout(() => {
          notification.close();
        }, 5000);
      } else if (response.status === 403) {
        notification.add("Nuk mund te ngarkoni dokumenta qe nuk jane pdf!", {
          variant: "error"
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
      stopLoading();
      console.log(err);
    });
};

export const editLegislation = (legislation, newInfo, notification) => {
  if (validateLegislation(newInfo, notification)) {
    startLoading();
    fetch("https://localhost:5443/legislation/admin/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: legislation._id, newInfo: newInfo }),
      credentials: "include"
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Legjislacioni u ndryshua me sukses!", {
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
        stopLoading();
        console.log(err);
      });
  }
};
