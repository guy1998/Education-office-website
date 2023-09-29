import { startLoading, stopLoading } from "./loading-controller.js";
import { logOut } from "./log-in-scripts.js";
const url = "https://localhost:5443/user/admin/";

export const getUser = proceeding => {
  fetch(url + "get", {
    credentials: "include"
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        alert("Your session has expired!");
        logOut();
      }
    })
    .then(data => {
      proceeding(data);
    })
    .catch(err => {
      console.log(err);
      alert("Problem ne server!");
    });
};

const validateUser = (user, notification) => {
  if (!user.name) {
    notification.add("Mungon emri", { variant: "error" });
    return false;
  } else if (!user.surname) {
    notification.add("Mungon mbiemri", { variant: "error" });
    return false;
  } else if (!user.email) {
    notification.add("Mungon emaili", { variant: "error" });
    return false;
  } else if (!user.username) {
    notification.add("Mungon emri i perdoruesit", { variant: "error" });
    return false;
  }

  return true;
};

const shortValidation = (user, notification) => {
  if (!user.name) {
    notification.add("Mungon emri", { variant: "error" });
    return false;
  } else if (!user.surname) {
    notification.add("Mungon mbiemri", { variant: "error" });
    return false;
  } else if (!user.email) {
    notification.add("Mungon emaili", { variant: "error" });
    return false;
  }

  return true;
};

export const editUser = (newInfo, notification) => {
  if (validateUser(newInfo, notification)) {
    fetch(url + "edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newInfo),
      credentials: "include"
    })
      .then(response => {
        if (response.status === 200) {
          notification.add("Te dhenat e perdoruesit u ndryshuan!", {
            variant: "success"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
          return response.json();
        } else if (response.status === 400) {
          return response.json();
        } else if (response.status === 401) {
          alert("Your session has expired!");
          logOut();
        } else {
          notification.add("Dicka shkoi keq!", { variant: "error" });
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      })
      .then(data => {
        if (data) {
          if (typeof data === "string") {
            notification.add(data, { variant: "error" });
            setTimeout(() => {
              notification.close();
            }, 5000);
          } else {
            localStorage.setItem("user", JSON.stringify(data));
            window.location.reload();
          }
        }
      })
      .catch(err => {
        console.log(err);
        notification.add("Dicka shkoi keq!", { variant: "error" });
        setTimeout(() => {
          notification.close();
        }, 5000);
      });
  }
};

export const changePassword = (oldPassword, newPassword, notification) => {
  startLoading();
  fetch(url + "changePassword", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword
    }),
    credentials: "include"
  })
    .then(response => {
      stopLoading();
      if (response.status === 200) {
        notification.add("Fjalekalimi u ndryshua", {
          variant: "success"
        });
        setTimeout(() => {
          notification.close();
        }, 5000);
      } else if (response.status === 401) {
        alert("Your session is expired!");
        logOut();
      } else if (response.status === 400) {
        return response.json();
      } else {
        notification.add("Uuups, dicka shkoi keq!", {
          variant: "error"
        });
        setTimeout(() => {
          notification.close();
        }, 5000);
      }
    })
    .then(data => {
      if (data) {
        if (typeof data === "string") {
          notification.add(data, {
            variant: "error"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else {
          localStorage.setItem("user", JSON.stringify(data));
        }
      }
    })
    .catch(err => {
      console.log(err);
      notification.add("Uuups, dicka shkoi keq!", {
        variant: "error"
      });
      setTimeout(() => {
        notification.close();
      }, 5000);
    });
};

export const addUser = (user, notification) => {
  if (shortValidation(user, notification)) {
    startLoading();
    fetch(url + "add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(user)
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Perdoruesi i ri u krijua me sukses!", {
            variant: "success"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else if (response.status === 401) {
          alert("Your session has expired!");
          logOut();
        } else if (response.status === 400) {
          return response.json();
        } else {
          notification.add("Uuups, dicka shkoi keq!", { variant: "error" });
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      })
      .then(data => {
        if (data && typeof data === "string") {
          notification.add(data, { variant: "error" });
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      })
      .catch(err => {
        console.log(err);
        notification.add("Uuups, dicka shkoi keq!", { variant: "error" });
        setTimeout(() => {
          notification.close();
        }, 5000);
      });
  }
};
