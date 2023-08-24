const security = require('./security-ground.js');

const retrieveUser = async (db, username) => {
    const user = await db.collection('user').findOne({ username: username });
    return user;
}

const credentialVerification = (enteredInfo, user) => {
    return security.passwordVerifier(enteredInfo.password, user.password);
}

const firstAuthentication = async (db, enteredInfo) => {
    const user = await retrieveUser(db, enteredInfo.username);
    if (user) {
        if (trial.credentialVerification(enteredInfo, user)) {
            return { status: 200, message: "Success" };
        } else {
            return { status: 401, message: "Wrong password" };
        }
    } else {
        return { status: 404, message: "User does not exist!" };
    }
}

const secondAuthentication = () => {

}


module.exports = {
    firstAuthentication: firstAuthentication,
    secondAuthentication: secondAuthentication
}