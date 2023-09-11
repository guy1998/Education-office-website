const { getDb } = require("./db.js");
const { ObjectId } = require("mongodb");

const getAllAnnouncements = async () => {
  const db = getDb();
  const announcements = await db.collection("announcements").find().toArray();
  return announcements;
};

const addAnnouncement = async announcement => {
  const db = getDb();
  try {
    const result = await db.collection("announcements").insertOne(announcement);
    console.log("Announcement successfully inserted!");
    return true;
  } catch (err) {
    console.log("Could not insert announcement: " + err);
    return false;
  }
};

const deleteAnnouncement = async id => {
  const db = getDb();
  try {
    const result = await db
      .collection("announcements")
      .deleteOne({ _id: new ObjectId(id) });
    console.log("Deleted successfully!");
    return true;
  } catch (err) {
    console.log("Could not delete the announcement");
    return false;
  }
};

const editAnnouncement = async (id, newInfo) => {
  try {
    const db = getDb();
    const result = await db.collection("announcements").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: newInfo.title,
          description: newInfo.description,
          link: newInfo.link
        },
        $currentDate: { lastModified: true }
      }
    );
    return true;
  } catch (err) {
    console.log("Could not edit!");
    return false;
  }
};

module.exports = {
  getAllAnnouncements: getAllAnnouncements,
  addAnnouncement: addAnnouncement,
  deleteAnnouncement: deleteAnnouncement,
  editAnnouncement: editAnnouncement
};
