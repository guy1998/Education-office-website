const express = require("express");
const app = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handler = require("../database/message-handler.js");
const authorize = require("../utilities/token.js");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/admin/retrieve", (req, res) => {
  authorize(req, res, () => {
    handler.readMessages().then(data => {
      res.json(data);
    });
  });
});

app.post("/send", (req, res) => {
  handler.addMessage(req.body).then(result => {
    if (result) res.status(200).json("Success");
    else res.status(500).json("Internal problems");
  });
});

app.delete("/admin/delete", (req, res) => {});

app.put("/admin/mark-read", (req, res) => {});

module.exports = app;
