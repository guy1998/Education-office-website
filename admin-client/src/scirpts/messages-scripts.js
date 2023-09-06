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
      else alert("No data could be retrieved!");
    })
    .then(data => {
      proceeding(data);
    });
};
