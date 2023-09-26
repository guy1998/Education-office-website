const express = require("express");
const app = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authorize = require("../utilities/token.js");
const handler = require("../database/news-handler.js");
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
      return cb(new Error("Only image format allowed!"));
    }
  }
});

app.use(upload.any());
app.use((err, req, res, next) => {
  if (err.message === "Only image format allowed!") {
    res.status(403).json("Should be an image");
  } else {
    console.log("Uncaught");
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.use(cookieParser());
app.use(bodyParser.json());

app.get("/retrieve", async (req, res) => {
  try {
    const news = await handler.getAllNews();
    res.status(200).json(news);
  } catch (err) {
    res.status(500).json("Server crashed!");
  }
});

app.get("/admin/retrieve", (req, res) => {
  authorize(req, res, () => {
    handler
      .getAllNews()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.error("Error getting institutions:", err);
        res.status(500).json("Could not get the instiutions");
      });
  });
});

app.post("/admin/add", (req, res) => {
  authorize(req, res, async () => {
    const photo = req.files.find(file => file.fieldname === "photo");
    const data = await uploadFile(photo);

    if (data.response) {
      const result = await handler.addNews({
        ...JSON.parse(req.body.news),
        photo: data.id
      });

      if (result) {
        res.status(200).json("Added successfully");
      } else {
        res.status(304).json("Could not add!");
      }
    } else {
      res.status(500).json("Could not upload with photo");
    }
  });
});

app.delete("/admin/delete", (req, res) => {
  authorize(req, res, () => {
    deleteFile(req.body.photo).then(data => {
      handler
        .deleteNews(req.body._id)
        .then(result => {
          if (result) res.status(200).json("Deleted successfully!");
          else res.status(304).json("Something went wrong!");
        })
        .catch(err => {
          res.status(500).json("Server crashed!");
        });
    });
  });
});

app.put("/admin/edit", (req, res) => {
  authorize(req, res, () => {
    handler
      .editNews(req.body._id, req.body.newInfo)
      .then(result => {
        if (result) res.status(200).json("Edited successfully");
        else res.status(304).json("Could not edit!");
      })
      .catch(err => {
        res.status(500).json("Server crashed!");
      });
  });
});

app.put("/admin/changePhoto", (req, res) => {
  authorize(req, res, () => {
    const photo = req.files.find(file => file.fieldname === "photo");
    uploadFile(photo).then(data => {
      if (data.response) {
        let newInfo = JSON.parse(req.body.news);
        const deleted = newInfo.photo;
        newInfo.photo = data.id;
        deleteFile(deleted).then(result => {
          handler
            .editNews(newInfo._id, newInfo)
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
