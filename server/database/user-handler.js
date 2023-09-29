const { ObjectId } = require("mongodb");
const { getDb } = require("./db.js");
const { passwordHasher } = require("../utilities/security-ground.js");
const userGenerator = require("../dev_tools/userGenerator");

const generateUser = async (user) => {
  try{
    await userGenerator(getDb(), user.name, user.surname, user.email);
  }catch(err){
    throw err;
  }
};

const editUser = async (id, newInfo) => {
  delete newInfo._id;
  delete newInfo.lastModified;
  try {
    const db = getDb();
    const result = db.collection("user").updateOne(
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
    console.log("Could not edit due to some error: " + err);
    return false;
  }
};

const changePassword = async (id, newPassword) => {
  const hashedPassword = passwordHasher(newPassword);
  try {
    const db = getDb();
    const result = db.collection("user").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          password: hashedPassword
        },
        $currentDate: { lastModified: true }
      }
    );
    const user = await db.collection('user').find({_id: new ObjectId(id)}).toArray();
    return user[0];
  } catch (err) {
    console.log("Could not edit due to some error: " + err);
    return false;
  }
};

module.exports = {
  generateUser: generateUser,
  editUser: editUser,
  changePassword: changePassword
};
