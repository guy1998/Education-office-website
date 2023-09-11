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
    authorize(req, res, () => {
        handler.editAnnouncement(req.body._id, req.body.newInfo)
            .then(result => {
                if (result)
                    res.status(200).json("Edited successfully!");
                else
                    res.status(304).json('Could not edit!');
            })
            .catch(err => {
                res.status(500).json("Something went wrong with the server!");
            })
    })
});

app.post('/admin/add', (req, res) => {
    authorize(req, res, () => {
        handler.addAnnouncement(req.body)
            .then(result => {
                if (result)
                    res.status(200).json("Added successfully!");
                else
                    res.status(304).json('Could not add!');
            })
            .catch(err => {
                res.status(500).json("Something went wrong with the server!");
            })
    })
});

app.delete('/admin/delete', (req, res) => {
    authorize(req, res, () => {
        handler.deleteAnnouncement(req.body._id)
            .then(result => {
                if (result)
                    res.status(200).json('Deleted successfully!');
                else
                    res.status(304).json('Could not delete!');
            })
            .catch(err => {
                res.status(500).json("Something went wrong with the server!");
            })
    })
});


module.exports = app;