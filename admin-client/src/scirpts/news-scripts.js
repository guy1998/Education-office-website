import { logOut } from "./log-in-scripts";
import { startLoading, stopLoading } from "./loading-controller";

export const retrieveNews = proceeding => {
  fetch("https://localhost:5443/news/admin/retrieve", {
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

const validateNews = (news, notification) => {
  setTimeout(() => {
    notification.close();
  }, 5000);

  if (!news.title) {
    notification.add("Titulli mungon", { variant: "error" });
    return false;
  } else if (!news.description) {
    notification.add("Pershkrimi mungon", { variant: "error" });
    return false;
  }

  return true;
};

export const addNews = (news, photo, notification) => {
  if (validateNews(news, notification)) {
    startLoading();
    let combinedData = new FormData();
    combinedData.append("news", JSON.stringify(news));
    combinedData.append("photo", photo);
    fetch("https://localhost:5443/news/admin/add", {
      method: "POST",
      body: combinedData,
      credentials: "include"
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Lajmi u shtua me sukses", {
            variant: "success"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else if (response.status === 401) {
          alert("Your session has expired!");
          logOut();
        } else if (response.status === 403) {
          notification.add("Nuk mund te ngarkoni dokumenta qe nuk jane foto!", {
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
        console.log(err);
      });
  }
};

export const deleteNews = (news, notification) => {
  startLoading();
  fetch("https://localhost:5443/news/admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(news),
    credentials: "include"
  })
    .then(response => {
      stopLoading();
      if (response.status === 200) {
        notification.add("Lajmi u fshi me sukses!", {
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

export const editNews = (news, newInfo, notification) => {
  if (validateNews(newInfo, notification)) {
    startLoading();
    fetch("https://localhost:5443/news/admin/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: news._id, newInfo: newInfo }),
      credentials: "include"
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Lajmi u ndryshua me sukses!", {
            variant: "success"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else if (response.status === 401) {
          alert("Your session has expired");
          logOut();
        } else if (response.status === 403) {
          notification.add("Nuk mund te ngarkoni dokumenta qe nuk jane foto!", {
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
        console.log(err);
      });
  }
};

export const changePhoto = (news, photo, notification) => {
  startLoading();
  let combinedData = new FormData();
  combinedData.append("news", JSON.stringify(news));
  combinedData.append("photo", photo);
  fetch("https://localhost:5443/news/admin/changePhoto", {
    method: "PUT",
    body: combinedData,
    credentials: "include"
  })
    .then(response => {
      stopLoading();
      if (response.status === 200) {
        notification.add("Imazhi u ndryshua me sukses", {
          variant: "success"
        });
        setTimeout(() => {
          notification.close();
        }, 5000);
      } else if (response.status === 403) {
        notification.add("Nuk mund te ngarkoni dokumenta qe nuk jane foto!", {
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
      console.log(err);
    });
};
