const security = require('./security-ground.js');
const { ObjectId } = require('mongodb')
const database = require('../database/db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const retrieveUser = async (username) => {
    const db = database.getDb();
    const user = await db.collection('user').findOne({ username: username });
    return user;
}

const getUserById = async (userid) => {
    const db = database.getDb();
    const objectId = new ObjectId(userid);
    const user = await db.collection('user').findOne({ _id: objectId });
    return user;
}

const credentialVerification = (enteredInfo, user) => {
    return security.passwordVerifier(enteredInfo.password, user.password);
}

const firstAuthentication = async (enteredInfo) => {
    const user = await retrieveUser(enteredInfo.username);
    if (user) {
        if (credentialVerification(enteredInfo, user)) {
            return { status: 200, user: user };
        } else {
            return { status: 401 };
        }
    } else {
        return { status: 404 };
    }
}

const secondAuthentication = (userid, otp) => {
    return security.otpVerifier(userid, otp);
}

const tokenIssuing = async (userid) => {
    const user = await getUserById(security.id_decrypter(userid));
    const accessToken = jwt.sign(user, process.env.JWT_KEY, {expiresIn: 900}) //15 minutes
    const refreshToken = jwt.sign(user, process.env.JWT_KEY, {expiresIn: '1h'});
    return {accessToken: accessToken, refreshToken: refreshToken};
}

module.exports = {
    firstAuthentication: firstAuthentication,
    secondAuthentication: secondAuthentication,
    tokenIssuing: tokenIssuing
}