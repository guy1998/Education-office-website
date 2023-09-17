const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const handler = require("../database/institution-handler.js");
const authorize = require("../utilities/token.js");
const photoUpload = require("../utilities/google-drive-api.js");
const multer = require("multer");
const { uploadFile, deleteFile } = require("../utilities/google-drive-api.js");

var upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif" ||
      file.mimetype == "image/bmp" ||
      file.mimetype == "image/webp" ||
      file.mimetype == "image/svg+xml" ||
      file.mimetype == "image/tiff" ||
      file.mimetype == "image/x-icon" ||
      file.mimetype == "image/vnd.microsoft.icon"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

app.use(upload.any());
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/retrieve", (req, res) => {
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
    deleteFile(req.body.photo).then((data) => {
      handler
      .deleteInstitution(req.body._id)
      .then(result => {
        if (result) 
          res.status(200).json("Deleted successfully!");
        else 
          res.status(304).json("Something went wrong!");
      })
      .catch(err => {
        res.status(500).json("Server crashed!");
      });
    });
  });
});

app.post("/admin/add", (req, res) => {
  authorize(req, res, () => {
    const photo = req.files.find(file => file.fieldname === "photo");
    uploadFile(photo).then(data => {
      if (data.response) {
        handler
          .addInstitution({
            ...JSON.parse(req.body.institution),
            photo: data.id
          })
          .then(result => {
            if (result) res.status(200).json("Added successfully");
            else res.status(304).json("Could not add!");
          })
          .catch(err => {
            res.status(500).json("Server crashed!");
          });
      } else {
        res.status(500).json("Could not upload with photo");
      }
    });
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
