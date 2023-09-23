const express = require("express");
const app = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handler = require("../database/legislation-handler.js");
const authorize = require("../utilities/token.js");
const multer = require("multer");
const { uploadFile, deleteFile } = require("../utilities/google-drive-api.js");

var upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only pdf format allowed!"));
    }
  }
});

app.use(upload.any());
app.use((err, req, res, next) => {
  if (err.message === "Only pdf format allowed!") {
    res.status(403).json("Should be a pdf");
  } else {
    console.log("Uncaught");
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/retrieve", (req, res) => {
  handler
    .getLegislations()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Error getting legislations:", err);
      res.status(500).json("Could not get the legislations");
    });
});

app.get("/admin/retrieve", (req, res) => {
  authorize(req, res, () => {
    handler
      .getLegislations()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.error("Error getting legislations:", err);
        res.status(500).json("Could not get the legislations");
      });
  });
});

app.post("/admin/add", (req, res) => {
  authorize(req, res, async () => {
    const pdf = req.files.find(file => file.fieldname === "pdf");
    const data = await uploadFile(pdf);
    if (data.response) {
      const result = await handler.addLegislation({
        ...JSON.parse(req.body.legislation),
        pdf: data.id
      });

      if (result) {
        res.status(200).json("Added successfully");
      } else {
        res.status(304).json("Could not add!");
      }
    } else {
      res.status(500).json("Could not upload with pdf");
    }
  });
});

app.put("/admin/edit", (req, res) => {
  authorize(req, res, () => {
    handler
      .editLegislation(req.body._id, req.body.newInfo)
      .then(result => {
        if (result) res.status(200).json("Edited successfully");
        else res.status(304).json("Could not edit");
      })
      .catch(err => {
        res.status(500).json("Internal error!");
      });
  });
});

app.delete("/admin/delete", (req, res) => {
  authorize(req, res, () => {
    deleteFile(req.body.pdf).then(data => {
      if (data) {
        handler
          .deleteLegislation(req.body._id)
          .then(data => {
            if (data) res.status(200).json("Deleted successfully");
            else res.status(304).json("Could not edit!");
          })
          .catch(err => {
            console.error("Error deleting legislation:", err);
            res.status(500).json("Could not delete legislation");
          });
      }
    });
  });
});

app.put("/admin/changePdf", (req, res) => {
  authorize(req, res, () => {
    const pdf = req.files.find(file => file.fieldname === "pdf");
    uploadFile(pdf).then(data => {
      if (data.response) {
        let newInfo = JSON.parse(req.body.legislation);
        const deleted = newInfo.pdf;
        newInfo.pdf = data.id;
        deleteFile(deleted).then(result => {
          handler
            .editLegislation(newInfo._id, newInfo)
            .then(result => {
              if (result) res.status(200).json("Edited successfully");
              else res.status(304).json("Could not edit!");
            })
            .catch(err => {
              res.status(500).json("Server crashed!");
            });
        });
      } else {
        res.status(500).json("Server crashed!");
      }
    });
  });
});

module.exports = app;
