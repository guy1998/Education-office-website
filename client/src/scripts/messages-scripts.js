export const sendMessage = (message, notification) => {
  if (validateMessage(message, notification)) {
    fetch("https://localhost:5443/messages/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(message)
    }).then(result => {
      if (result.status === 200) {
        notification.add("Kërkesa juaj u dërgua me sukses!", {
          variant: "success"
        });
        setTimeout(() => {
          notification.close();
        }, 4000);
        return true;
      } else {
        notification.add("Dicka shkoi keq!", {
          variant: "error"
        });
        setTimeout(() => {
          notification.close();
        }, 4000);
        return false;
      }
    });
    return true;
  }

  return false;
};

const validateMessage = (message, notification) => {
  setTimeout(() => {
    notification.close();
  }, 4000);
  if (!message.header) {
    notification.add("Mungon subjekti", { variant: "error" });
    return false;
  } else if (!message.body) {
    notification.add("Pershkrimi i mesazhit mungon", { variant: "error" });
    return false;
  } else if (!message.writer) {
    notification.add("Emri juaj mungon", { variant: "error" });
    return false;
  } else if (!message.email) {
    notification.add("E-mail juaj mungon", { variant: "error" });
    return false;
  }

  return true;
};
