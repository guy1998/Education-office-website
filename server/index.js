const express = require('express');
const app = express();
const cors = require("cors");
const { connectToDb, getDb } = require('./database/db.js');
const announcements = require('./routers/announcements.js');
const auth = require('./routers/authenticate.js');

const allowedOrigins = ['http://localhost:3456', 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('hello from the other side');
        }
    }
}));

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
app.use('/authenticate', auth);
