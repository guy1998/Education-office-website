const express = require('express');
const app = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handler = require('../database/staff-handler');
const authorize = require('../utilities/token.js');

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/retrieve', (req, res)=>{

});

app.get('/admin/retrieve', (req, res)=>{

});

app.post('/admin/add', (req, res)=>{

});

app.put('/admin/edit', (req, res)=>{

});

app.delete('/admin/delete', (req, res)=>{

});

module.exports = app;