const { getDb } = require("./db.js");
const { ObjectId } = require("mongodb");
const addStaff = async staffMember => {
  try {
    const db = getDb();
    const result = db.collection("staff").insertOne(staffMember);
    return true;
  } catch (err) {
    console.log("Could not add this member due to some error: " + err);
    return false;
  }
};

const deleteStaff = async id => {
  try {
    const db = getDb();
    const result = db.collection("staff").deleteOne({
      _id: new ObjectId(id)
    });
    return true;
  } catch (err) {
    console.log("Could not delete due to some error: " + err);
    return false;
  }
};

const editStaff = async (id, newInfo) => {
  delete newInfo._id;
  delete newInfo.lastModified;
  try {
    const db = getDb();
    const result = db.collection("staff").updateOne(
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
    console.log('Could not edit due to some error: ' + err);
    return false;
  }
};

const getAllStaff = async ()=>{
    const db = getDb();
    const staff = db.collection('staff').find().toArray();
    return staff;
}

module.exports = {
    getAllStaff: getAllStaff,
    editStaff: editStaff,
    deleteStaff: deleteStaff,
    addStaff: addStaff
}
