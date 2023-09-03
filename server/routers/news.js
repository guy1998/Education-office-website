const express = require('express');
const app = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authorize = require('../utilities/token.js');
const handler = require('../database/news-handler.js');

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/retrieve', (req, res)=>{

});

app.get('/admin/retrieve', (req, res)=>{

});

app.post('/admin/add', (req, res)=>{

});

app.delete('/admin/delete', (req, res)=>{

});

app.put('/admin/edit', (req, res)=>{

});

module.exports = app;