const { getDb } = require("./db");
const {ObjectId} = require('mongodb');

const addMessage = async message => {
  const db = getDb();
  try {
    const result = await db.collection("messages").insertOne(message);
    console.log("Sent successfully");
    return true;
  } catch (err) {
    console.log("Could not send!");
    return false;
  }
};

const removeMessage = async id => {
  const db = getDb();
  try {
    console.log(id);
    const result = await db.collection("messages").deleteOne({ _id: new ObjectId(id) });
    console.log("Deleted successfully!");
    return true;
  } catch (err) {
    console.log("Could not delete the message");
    return false;
  }
};

const markAsRead = async id => {
  const db = getDb();
  try {
    const result = await db.collection("messages").updateOne(
      { _id: id },
      {
        $set: {
          read: true,
        },
      }
    );
    console.log("Updated successfully");
    return true;
  } catch (err) {
    console.log("Could not update");
    return false;
  }
};

const readMessages = async ()=>{
    const db = getDb();
    const messages = await db.collection('messages').find().toArray();
    return messages;
}

module.exports = {
  markAsRead: markAsRead,
  removeMessage: removeMessage,
  addMessage: addMessage,
  readMessages: readMessages
};
