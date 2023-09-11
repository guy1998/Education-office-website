import { startLoading, stopLoading } from "./loading-controller";

export const verifyOtp = (temp_id, otp, navigator) => {
  fetch("https://localhost:5443/authenticate/otp", {
    method: "POST",
    credentials: "include",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ temp_id: temp_id, otp: otp }),
  })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        alert("Otp has expired");
        window.location.reload();
      } else if (response.status === 401) {
        const msg = document.getElementById("errorMessage");
        msg.innerHTML = "OTP is not correct!";
      }
    })
    .then(data => {
      if (data) {
        localStorage.setItem("logged", true);
        navigator("/home", { replace: true });
      } else {
        alert(
          "Could not log you in at this time for some reason. Contact the information!"
        );
      }
    });
};

export const login = (username, password, otpchecker, notification) => {
  startLoading();
  fetch("https://localhost:5443/authenticate/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then(response => {
      if (response.status === 200) return response.json();
      else if (response.status === 404) notification.add('User does not exist', {variant: 'error'});
      else notification.add('Wrong password', {variant: 'error'});
    })
    .then(serverData => {
      if (serverData) {
        localStorage.setItem("temporary_id", serverData.temp_id);
        stopLoading();
        otpchecker();
      }
    });
};

export const logOut = () => {
  fetch("https://localhost:5443/authenticate/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then(result => {
    if (result.status === 200) {
      localStorage.setItem("logged", false);
      window.location.reload();
    } else {
      alert("Could not log out! Please contact the information!");
    }
  });
};
