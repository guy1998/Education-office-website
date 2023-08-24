const nodemailer = require('nodemailer');
require('dotenv').config();
const otpGenerator = require('./security-ground.js');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtp = (emailAdress) => {

    const otp = otpGenerator();

    const mailOptions = {
        from: "no-reply",
        to: emailAdress,
        subject: 'VERIFICATION CODE',
        text: 'Hello, this is your one time password: ' + otp + ' It will allow you to login this time. If it wasn\'t you who tried to login please contact us!',
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    })
}

const sendUserInfo = (emailAdress, username, password) => {
    const mailOptions = {
        from: "no-reply",
        to: emailAdress,
        subject: 'INFORMACION MBI PERDORUESIN E RI',
        text: "Pershendetje dhe mire se vini ne sistemin e menaxhimit te ZVAP. Ketu keni informacionet mbi llogarine tuaj:\n" + "Emri i perdoruesit: " + username + "\nFjalekalimi: " + password + "/nPasi te kyceni ne llogarine tuaj mund te ndryshoni emrin e perdoruesit dhe fjalekalimin tuaj."
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    })
}

module.exports = {
    sendOtp: sendOtp,
    sendUserInfo: sendUserInfo
};