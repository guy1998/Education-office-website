const express = require('express');
const { getDb } = require('../db');
const logger = require('../utilities/log-in');
const app = express.Router();

app.get('/login', (req, res)=>{
    const db = getDb();
    logger.firstAuthentication(db, req.body).then((authValue)=>{
        if(authValue.status === 200){
            res.status(200).json('Login was successful!');
        }else if(authValue.status === 401){
            res.status(401).json('Wrong password!');
        }else{
            res.status(404).json('User does not exist!');
        }
    })
});

app.get('/otp', (req, res)=>{

});

module.exports = app;