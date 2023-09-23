const express = require("express");
const app = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const handler = require("../database/exams-handler.js");
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

app.get("/retrieve/matura", (req, res) => {
  handler
    .getExams("matura")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Error getting exams:", err);
      res.status(500).json("Could not get the exams");
    });
});

app.get("/retrieve/minimatura", (req, res) => {
  handler
    .getExams("minimatura")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Error getting exams:", err);
      res.status(500).json("Could not get the exams");
    });
});

app.get("/retrieve/olimpiada", (req, res) => {
  handler
    .getExams("olimp")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.error("Error getting exams:", err);
      res.status(500).json("Could not get the exams");
    });
});

app.get("/admin/retrieve/exams", (req, res) => {
  authorize(req, res, () => {
    handler
      .getExams("")
      .then(data => {
        res.status(200).json(
          data.filter(exam => {
            return exam.type === "minimatura" || exam.type === "matura";
          })
        );
      })
      .catch(err => {
        console.error("Error getting exams:", err);
        res.status(500).json("Could not get the exams");
      });
  });
});

app.get("/admin/retrieve/olimpiada", (req, res) => {
  authorize(req, res, () => {
    handler
      .getExams("olimp")
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.error("Error getting exams:", err);
        res.status(500).json("Could not get the exams");
      });
  });
});

app.delete("/admin/delete", (req, res) => {
  authorize(req, res, () => {
    deleteFile(req.body.pdf).then(data => {
      if (data) {
        handler
          .deleteExam(req.body._id)
          .then(data => {
            if (data) res.status(200).json("Deleted successfully");
            else res.status(304).json("Could not edit!");
          })
          .catch(err => {
            console.error("Error deleting exam:", err);
            res.status(500).json("Could not delete exam");
          });
      }
    });
  });
});

app.post("/admin/add", (req, res) => {
  authorize(req, res, async () => {
    const pdf = req.files.find(file => file.fieldname === "pdf");
    const data = await uploadFile(pdf);
    if (data.response) {
      const result = await handler.addExam({
        ...JSON.parse(req.body.exam),
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

app.put("/admin/changePdf", (req, res) => {
  authorize(req, res, () => {
    const pdf = req.files.find(file => file.fieldname === "pdf");
    uploadFile(pdf).then(data => {
      if (data.response) {
        let newInfo = JSON.parse(req.body.exam);
        const deleted = newInfo.pdf;
        newInfo.pdf = data.id;
        deleteFile(deleted).then(result => {
          handler
            .editExam(newInfo._id, newInfo)
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

app.put("/admin/edit", (req, res) => {
  authorize(req, res, () => {
    handler
      .editExam(req.body._id, req.body.newInfo)
      .then(result => {
        if (result) res.status(200).json("Edited successfully");
        else res.status(304).json("Could not edit");
      })
      .catch(err => {
        res.status(500).json("Internal error!");
      });
  });
});

module.exports = app;
