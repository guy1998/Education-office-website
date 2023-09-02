const express = require('express');
const logger = require('../utilities/log-in');
const email = require('../utilities/email.js');
const security = require('../utilities/security-ground.js');
const app = express.Router();
const bodyparser = require('body-parser');

app.use(bodyparser.json())

app.post('/login', (req, res) => {
    logger.firstAuthentication(req.body).then((authValue) => {
        if (authValue.status === 200) {
            const temp_id = security.temporary_id_generator(authValue.user._id.toString());
            email.sendOtp(authValue.user.email, temp_id);
            res.status(200).json({ temp_id: temp_id });
        } else if (authValue.status === 401) {
            res.status(401).json('Wrong password!');
        } else {
            res.status(404).json('User does not exist!');
        }
    })
});

app.post('/otp', (req, res) => {
    const result = logger.secondAuthentication(req.body.temp_id, req.body.otp);
    if (result.result) {
        logger.tokenIssuing(req.body.temp_id)
            .then(tokenObject => {
                res.cookie('tokenCookie', tokenObject, {
                    maxAge: 3600000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });

                res.status(200).json({ msg: 'token sent through cookie' });
            })
    }
    else if (result.code === 2)
        res.status(401).json("Wrong OTP");
    else if (result.code === 3)
        res.status(404).json("OTP has expired");
    else
        res.status(500).json("Server malfunction");
});

app.post('/logout', (req, res) => {
    console.log('Loging out!');
    res.cookie('tokenCookie', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.status(200).json('Successfully logged out!');
});

module.exports = app;