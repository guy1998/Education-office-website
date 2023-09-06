export const sendMessage = message => {
  fetch("https://localhost:5443/messages/send", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(message),
  }).then(result => {
    if (result.status === 200) console.log("Yeaaa");
    else console.log("Nooo");
  });
};

export const validateMessage = message => {
  if (!message.writer) return { result: false, msg: "Emri mungon!" };
  else if (!message.body) return { result: false, msg: "Mungon pershkrimi!" };
  else if (!message.header) return { result: false, msg: "Mungon titulli!" };

  return { result: true, msg: "All good" };
};
