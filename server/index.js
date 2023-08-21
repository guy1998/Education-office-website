const express = require('express');
const app = express();
const cors = require("cors");
const { connectToDb, getDb } = require('./db');
let db = null;
const trial = require('./utilities/userGenerator');

app.use(cors());

connectToDb((err) => {
    if (err) {
        console.log("Something went wrong with the server! Please try again later");
    } else {
        app.listen(5000, () => {
            trial();
            console.log("Listening to port 5000");
        });
        db = getDb();
    }
})

app.get("/announcements", (req, res) => {

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