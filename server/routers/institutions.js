const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const handler = require("../database/institution-handler.js");
const authorize = require("../utilities/token.js");

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/retrieve", (req, res) => {});

app.get("/admin/retrieve", (req, res) => {
  authorize(req, res, () => {
    handler
      .getInstitutions()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.error("Error getting institutions:", err);
        res.status(500).json("Could not get the instiutions");
      });
  });
});

app.delete("/admin/delete", (req, res) => {
  authorize(req, res, () => {
    handler
      .deleteInstitution(req._id)
      .then(result => {
        if (result) res.json(200).json("Deleted successfully!");
        else res.json(304).json("Something went wrong!");
      })
      .catch(err => {
        res.status(500).json("Server crashed!");
      });
  });
});

app.post("/admin/add", (req, res) => {
  authorize(req, res, () => {
    {
      handler
        .addInstitution(req.body)
        .then(result => {
          if (result) res.status(200).json("Added successfully");
          else res.status(304).json("Could not add!");
        })
        .catch(err => {
          res.status(500).json("Server crashed!");
        });
    }
  });
});

app.put("/admin/edit", (req, res) => {
  authorize(req, res, () => {
    handler
      .editInstitution(req.body._id, req.body.newInfo)
      .then(result => {
        if (result) res.status(200).json("Edited successfully");
        else res.status(304).json("Could not edit!");
      })
      .catch(err => {
        res.status(500).json("Server crashed!");
      });
  });
});

module.exports = app;
