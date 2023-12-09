const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const { connectToDb } = require('./database/db.js');
const announcements = require('./routers/announcements.js');
const auth = require('./routers/authenticate.js');
const news = require('./routers/news.js');
const institutions = require('./routers/institutions.js');
const staff = require('./routers/staff.js');
const legislation = require('./routers/legislation.js');
const messages = require('./routers/messages.js');
const portal = require('./routers/portal.js');
const exams = require('./routers/exams.js');
const user = require('./routers/user.js');
const { generateUser } = require('./database/user-handler.js');

const allowedOrigins = ['https://localhost:3456', 'https://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use("/announcements", announcements);
app.use('/authenticate', auth);
app.use('/news', news);
app.use('/institutions', institutions);
app.use('/staff', staff);
app.use('/legislation', legislation);
app.use('/messages', messages);
app.use('/portal', portal);
app.use('/exams', exams);
app.use('/user', user);

const options = {
    key: fs.readFileSync('./localhost.decrypted.key'),
    cert: fs.readFileSync('./localhost.crt'),
};
const port = 5443;
const server = https.createServer(options, app);

connectToDb((err) => {
    if (err) {
        console.log("Something went wrong with the server! Please try again later");
    } else {

        server.listen(port, () => {
            console.log(`Listening to HTTPS on port ${port}`);
        });
    }
})