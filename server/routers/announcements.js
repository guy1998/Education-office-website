const express = require('express');
const app = express.Router();
const authorize = require('../utilities/token.js');
const handler = require('../database/announcement-handler.js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/retrieve", (req, res) => {
    handler.getAllAnnouncements()
        .then(announcements => {
            res.status(200).json(announcements);
        })
        .catch(error => {
            console.error("Error getting announcements:", error);
            res.status(500).json("Could not get the announcements");
        });
});

app.get('/admin/retrieve', (req, res) => {
    authorize(req, res, () => {
        handler.getAllAnnouncements()
            .then(data => res.status(200).json(data))
            .catch(error => {
                console.error("Error getting announcements:", error);
                res.status(500).json("Could not get the announcements");
            });;
    })
});

app.put('/admin/edit', (req, res) => {

});

app.post('/admin/add', (req, res) => {

});

app.delete('/admin/delete', (req, res) => {

});


module.exports = app;