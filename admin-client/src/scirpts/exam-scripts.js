import { logOut } from "./log-in-scripts";
import { startLoading, stopLoading } from "./loading-controller";

export const retrieveExams = (proceeding, code) => {
  let url = "";
  if (code === 1) url = "admin/retrieve/exams";
  else url = "admin/retrieve/olimpiada";
  fetch("https://localhost:5443/exams/" + url, {
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

export const deleteExam = (exam, notification) => {
  startLoading();
  fetch("https://localhost:5443/exams/admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(exam),
    credentials: "include"
  })
    .then(response => {
      stopLoading();
      if (response.status === 200) {
        notification.add("Provimi u fshi me sukses!", {
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
      //stopLoading();
      console.log(err);
    });
};

const validateExam = (exam, notification) => {
  if (!exam.title) {
    notification.add("Titulli mungon", { variant: "error" });
    return false;
  }

  return true;
};

export const addExam = (exam, pdf, notification) => {
  if (validateExam(exam, notification)) {
    startLoading();
    let combinedData = new FormData();
    combinedData.append("exam", JSON.stringify(exam));
    combinedData.append("pdf", pdf);
    fetch("https://localhost:5443/exams/admin/add", {
      method: "POST",
      body: combinedData,
      credentials: "include"
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Provimi u shtua me sukses", {
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

export const changeExamPdf = (exam, pdf, notification) => {
  startLoading();
  let combinedData = new FormData();
  combinedData.append("exam", JSON.stringify(exam));
  combinedData.append("pdf", pdf);
  fetch("https://localhost:5443/exams/admin/changePdf", {
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

export const editExam = (exam, newInfo, notification) => {
  if (validateExam(newInfo, notification)) {
    startLoading();
    fetch("https://localhost:5443/exams/admin/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: exam._id, newInfo: newInfo }),
      credentials: "include"
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Provimi u ndryshua me sukses!", {
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
