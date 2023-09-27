const express = require("express");
const app = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handler = require("../database/staff-handler");
const authorize = require("../utilities/token.js");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/retrieve", (req, res) => {
  handler
    .getAllStaff()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json("Server crashed");
    });
});

app.get("/admin/retrieve", (req, res) => {
  authorize(req, res, () => {
    handler
      .getAllStaff()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json("Server crashed");
      });
  });
});

app.post("/admin/add", (req, res) => {
  authorize(req, res, () => {
    handler
      .addStaff(req.body)
      .then(result => {
        if (result) res.status(200).json("Added successfully!");
        else res.status(304).json("Could not add!");
      })
      .catch(err => {
        res.status(500).json("Server crashed");
      });
  });
});

app.put("/admin/edit", (req, res) => {
  authorize(req, res, () => {
    handler
      .editStaff(req.body._id, req.body.newInfo)
      .then(result => {
        if (result) res.status(200).json("Edited successfully!");
        else res.status(304).json("Could not edit!");
      })
      .catch(err => {
        res.status(500).json("Server crashed!");
      });
  });
});

app.delete("/admin/delete", (req, res) => {
  authorize(req, res, () => {
    handler
      .deleteStaff(req.body._id)
      .then(result => {
        if (result) res.status(200).json("Deleted successfully!");
        else res.status(304).json("Could not delete!");
      })
      .catch(err => {
        res.status(500).json("Server crashed!");
      });
  });
});

module.exports = app;