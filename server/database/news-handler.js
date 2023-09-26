const { ObjectId } = require("mongodb");
const { getDb } = require("./db.js");

const addNews = async news => {
  try {
    const db = getDb();
    const result = db.collection("news").insertOne(news);
    return true;
  } catch (err) {
    console.log("Could not add due to an error: " + err);
    return false;
  }
};

const deleteNews = async id => {
  try {
    const db = getDb();
    const result = db.collection("news").deleteOne({
      _id: new ObjectId(id)
    });
    return true;
  } catch (err) {
    console.log("Could not delete due to an error: " + err);
    return false;
  }
};

const editNews = async (id, newInfo) => {
  delete newInfo._id;
  delete newInfo.lastModified;
  try {
    const db = getDb();
    const result = db.collection("news").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...newInfo
        },
        $currentDate: { lastModified: true }
      }
    );
    return true;
  } catch (err) {
    console.log("Could not edit due to an error: " + err);
    return false;
  }
};

const getAllNews = async () => {
  const db = getDb();
  const news = await db.collection("news").find().toArray();
  return news;
};

module.exports = {
  addNews: addNews,
  editNews: editNews,
  deleteNews: deleteNews,
  getAllNews: getAllNews
};
