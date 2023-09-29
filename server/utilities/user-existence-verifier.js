const {getDb} = require('../database/db.js');
const jwt = require('jsonwebtoken');

const verifyByEmail = async (email)=>{
    const db = getDb();
    const user = await db.collection('user').find({email: email}).toArray();
    return user.length >= 1;
}

const verifyByUsername = async (username)=>{
    const db = getDb();
    const user = await db.collection('user').find({username: username}).toArray();
    return user.length >= 1;
}

const verifyEditExistence = async (req)=>{
    const tokens = req.cookies.tokenCookie;
    const decoded = jwt.verify(tokens.refreshToken, process.env.JWT_KEY);
    let usernameCheck = false;
    let emailCheck = false;
    if(decoded.username !== req.body.username){
        usernameCheck = await verifyByUsername(req.body.username);
    }

    if(decoded.email !== req.body.email){
        emailCheck = await verifyByEmail(req.body.email);
    }

    return emailCheck || usernameCheck;
}

const verifyAddExistence = async (newUser)=>{
    const check1 = await verifyByEmail(newUser.email);
    const check2 = await verifyByUsername(newUser.username);

    return check1 || check2;
}

module.exports = {
    verifyAddExistence: verifyAddExistence,
    verifyEditExistence: verifyEditExistence
}