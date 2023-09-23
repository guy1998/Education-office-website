const { getDb } = require("./db.js");
const { ObjectId } = require("mongodb");

const getExams = async examType => {
  const db = getDb();
  const exams = db.collection("exams").find().toArray();
  if (examType)
    return exams.filter(exam => {
      return exam.type === examType;
    });
  else return exams;
};

const addExam = async exam => {
  const db = getDb();
  try {
    const result = db.collection("exams").insertOne(exam);
    return true;
  } catch (err) {
    console.log("Could not add!");
    return false;
  }
};

const deleteExam = async id => {
  const db = getDb();
  try {
    const result = db.collection("exams").deleteOne({
      _id: new ObjectId(id)
    });
    return true;
  } catch (err) {
    console.log("Could not delete!");
    return false;
  }
};

const editExam = async (id, newInfo) => {
  const db = getDb();
  delete newInfo._id;
  delete newInfo.lastModified;
  try {
    const result = db.collection("exams").updateOne(
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
    return false;
  }
};

module.exports = {
  getExams: getExams,
  addExam: addExam,
  deleteExam: deleteExam,
  editExam: editExam
};
