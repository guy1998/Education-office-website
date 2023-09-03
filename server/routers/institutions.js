const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handler = require('../database/institution-handler.js');
const authorize = require('../utilities/token.js');

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/retrieve', (req, res)=>{

});

app.get('/admin/retrieve', (req, res)=>{

});

app.delete('/admin/delete', (req, res)=>{

});

app.post('/admin/add', (req, res)=>{

});

app.put('/admin/edit', (req, res)=>{

});

module.exports = app;