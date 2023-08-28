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


module.exports = {
    firstAuthentication: firstAuthentication,
    secondAuthentication: secondAuthentication
}