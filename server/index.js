const express = require('express');
const app = express();
const cors = require("cors");
const { connectToDb, getDb } = require('./database/db.js');
const announcements = require('./routers/announcements.js');

app.use(cors());

connectToDb((err) => {
    if (err) {
        console.log("Something went wrong with the server! Please try again later");
    } else {
        app.listen(5000, () => {
            console.log("Listening to port 5000");
        });
    }
})

app.use("/announcements", announcements);

