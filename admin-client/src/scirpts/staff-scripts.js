import { logOut } from "./log-in-scripts";
import { startLoading, stopLoading } from "./loading-controller";
const url = "https://localhost:5443/staff/";

export const getStaff = proceeding => {
  fetch(url + "admin/retrieve", {
    credentials: "include"
  })
    .then(response => {
      if (response.status === 200) return response.json();
      else if (response.status === 401) {
        alert("Your session has expired!");
        logOut();
      } else {
        alert("Server problems!");
      }
    })
    .then(data => {
      proceeding(data);
    })
    .catch(err => {
      alert("Something went wrong with the server!");
    });
};

const validateStaff = (staff, notification) => {
  setTimeout(() => {
    notification.close();
  }, 5000);

  if (staff.name === "") {
    notification.add("Emri mungon", { variant: "error" });
    return false;
  } else if (staff.surname === "") {
    notification.add("Mbiemri mungon", { variant: "error" });
    return false;
  } else if (staff.position === "") {
    notification.add("Pozicioni mungon", { variant: "error" });
    return false;
  } else if (staff.phoneNumber === "") {
    notification.add("Numri i telefonit mungon", { variant: "error" });
    return false;
  } else if (staff.email === "") {
    notification.add("Emaili mungon", { variant: "error" });
    return false;
  }

  return true;
};

export const addStaff = (staff, notification) => {
  if (validateStaff(staff, notification)) {
    startLoading();
    fetch(url + "admin/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(staff)
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Anetari u shtua me sukses!", {
            variant: "success"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else if (response.status === 401) {
          alert("Your session has expired!");
          logOut();
        } else {
          notification.add("Uupps, dicka shkoi keq!", { variant: "error" });
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      })
      .catch(err => {
        notification.add("Uupps, dicka shkoi keq!", { variant: "error" });
        setTimeout(() => {
          notification.close();
        }, 5000);
      });
      return true;
  }

  return false;
};

export const editStaff = (id, newInfo, notification) => {
  if (validateStaff(newInfo, notification)) {
    startLoading();
    fetch(url + "admin/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ _id: id, newInfo: newInfo })
    })
      .then(response => {
        stopLoading();
        if (response.status === 200) {
          notification.add("Anetari u perditesua me sukses!", {
            variant: "success"
          });
          setTimeout(() => {
            notification.close();
          }, 5000);
        } else if (response.status === 401) {
          alert("Your session has expired!");
          logOut();
        } else {
          notification.add("Uupps, dicka shkoi keq!", { variant: "error" });
          setTimeout(() => {
            notification.close();
          }, 5000);
        }
      })
      .catch(err => {
        notification.add("Uupps, dicka shkoi keq!", { variant: "error" });
        setTimeout(() => {
          notification.close();
        }, 5000);
      });
  }
};

export const deleteStaff = (id, notification) => {
    startLoading();
  fetch(url + "admin/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({_id: id}),
    credentials: "include"
  })
    .then(response => {
      stopLoading();
      if (response.status === 200) {
        notification.add("Anetari u fshi me sukses!", {
          variant: "success"
        });
        setTimeout(() => {
          notification.close();
        }, 5000);
      } else if (response.status === 401) {
        alert("Your session has expired!");
        logOut();
      } else {
        notification.add("Uupps, dicka shkoi keq!", { variant: "error" });
        setTimeout(() => {
          notification.close();
        }, 5000);
      }
    })
    .catch(err => {
        console.log(err);
      notification.add("Uupps, dicka shkoi keq!", { variant: "error" });
      setTimeout(() => {
        notification.close();
      }, 5000);
    });
};
