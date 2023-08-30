const express = require('express');
const logger = require('../utilities/log-in');
const email = require('../utilities/email.js');
const security = require('../utilities/security-ground.js');
const app = express.Router();
const cors = require('cors')
const bodyparser = require('body-parser');

app.use(cors());
app.use(bodyparser.json())

app.post('/login', (req, res)=>{
    logger.firstAuthentication(req.body).then((authValue)=>{
        if(authValue.status === 200){
            const temp_id = security.temporary_id_generator(authValue.user._id.toString());
            email.sendOtp(authValue.user.email, temp_id);
            res.status(200).json({temp_id: temp_id});
        }else if(authValue.status === 401){
            res.status(401).json('Wrong password!');
        }else{
            res.status(404).json('User does not exist!');
        }
    })
});

app.post('/otp', (req, res)=>{
    const result = logger.secondAuthentication(req.body.temp_id, req.body.otp);
    if(result.result){
        logger.tokenIssuing(req.body.temp_id)
        .then(tokenObject=>{
            res.status(200).json(tokenObject);
        })
    }
    else if(result.code === 2)
        res.status(401).json("Wrong OTP");
    else if(result.code === 3)
        res.status(404).json("OTP has expired");
    else 
        res.status(500).json("Server malfunction");
});

module.exports = app;