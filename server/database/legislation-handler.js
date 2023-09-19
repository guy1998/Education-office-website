const { getDb } = require("./db.js");
const { ObjectId } = require("mongodb");

const addLegislation = async (legistlation) => {
  const db = getDb();
  try {
    const result = db.collection("legislation").insertOne(legistlation);
    return true;
  } catch (err) {
    console.log("Could not add!");
    return false;
  }
};

const deleteLegislation = async (id) => {
  const db = getDb();
  try {
    const result = db.collection("legislation").deleteOne({
      _id: new ObjectId(id)
    });
    return true;
  } catch (err) {
    console.log("Could not delete!");
    return false;
  }
};

const editLegislation = async (id, newInfo) => {
  const db = getDb();
  delete newInfo._id;
  delete newInfo.lastModified;
  try {
    const result = db.collection("legislation").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...newInfo,
          $currentDate: { lastModified: true }
        }
      }
    );
    return true;
  } catch (err) {
    console.log('Could not edit!');
    return false;
  }
};

const getLegislations = async ()=>{
    const db = getDb();
    const legislations = db.collection('legislation').find().toArray();
    return legislations;
}

module.exports = {
    getLegislations: getLegislations,
    deleteLegislation: deleteLegislation,
    addLegislation: addLegislation,
    editLegislation: editLegislation
}
