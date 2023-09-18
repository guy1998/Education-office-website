const { getDb } = require("./db.js");
const { ObjectId } = require("mongodb");

const addInstitution = async institution => {
  try {
    const db = getDb();
    const result = db.collection("institutions").insertOne(institution);
    console.log("Institution inserted successfully!");
    return true;
  } catch (err) {
    console.log("Could not insert!");
    return false;
  }
};

const deleteInstitution = async id => {
  try {
    const db = getDb();
    const result = db
      .collection("institutions")
      .deleteOne({ _id: new ObjectId(id) });
    console.log("Institution deleted successfully!");
    return true;
  } catch (err) {
    console.log("Could not delete!");
    return false;
  }
};

const editInstitution = async (id, newInfo) => {
  delete newInfo._id;
  delete newInfo.lastModified;
  try {
    const db = getDb();
    const result = await db.collection("institutions").updateOne(
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
    console.log("Could not edit!");
    console.log(err);
    return false;
  }
};

const getInstitutions = async () => {
  const db = getDb();
  const institutions = await db.collection("institutions").find().toArray();
  return institutions;
};

module.exports = {
  addInstitution: addInstitution,
  editInstitution: editInstitution,
  deleteInstitution: deleteInstitution,
  getInstitutions: getInstitutions
};
