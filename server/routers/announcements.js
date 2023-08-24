const express = require('express');
const { getDb } = require('../database/db.js');
const app = express.Router();

app.get("/retrieve", (req, res) => {

    const db = getDb();
    db.collection("announcements")
        .find()
        .toArray()
        .then(announcements => {
            res.status(200).json(announcements);
        })
        .catch(error => {
            console.error("Error getting announcements:", error);
            res.status(500).json("Could not get the announcements");
        });

});

module.exports = app;