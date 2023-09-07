export const getMessages = proceeding => {
  fetch("https://localhost:5443/messages/admin/retrieve", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  })
    .then(result => {
      if (result.status === 200) return result.json();
      else if (result.status === 401) {
        alert("Your session has expired");
        localStorage.setItem("logged", false);
        window.location.reload();
      } else alert("No data could be retrieved!");
    })
    .then(data => {
      proceeding(data);
    });
};

export const generatePDF = message => {
  fetch("https://localhost:5443/messages/admin/generate-pdf", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(message),
  })
    .then(response => {
      if (response.status === 401) {
        alert("Your session has expired!");
        localStorage.setItem("logged", false);
        window.location.reload();
      }
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = message.writer + ".pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => console.error("Error:", error));
};

export const deleteMessage = message => {
  const confirmation = window
    .confirm("A jeni i sigurte se doni ta fshini kete mesazh?")
    .valueOf();
  if (confirmation) {
    fetch("https://localhost:5443/messages/admin/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
      credentials: 'include'
    }).then(response => {
      if (response.status === 401) {
        alert("Your session has expired!");
        localStorage.setItem("logged", false);
        window.location.reload();
      } else if (response.status === 200) alert("Deleted successfully");
    });
  }
};
