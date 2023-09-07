const express = require("express");
const app = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handler = require("../database/message-handler.js");
const authorize = require("../utilities/token.js");
const pdf = require("pdfkit");
const fs = require("fs");

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

app.delete("/admin/delete", (req, res) => {
  authorize(req, res, () => {
    handler
      .removeMessage(req.body._id)
      .then(result => {
        if (result) res.status(200).json("Deleted successfully!");
        else res.status(500).json("Something went wrong!");
      })
      .catch(err => {
        console.log(err);
      });
  });
});

app.put("/admin/mark-read", (req, res) => {});

app.post("/admin/generate-pdf", (req, res) => {
  authorize(req, res, () => {
    const doc = new pdf({ size: "A4" });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + req.body.writer + ".pdf"
      );
      res.send(pdfData);
    });

    doc.fontSize(25).text(req.body.header, 80, doc.y);
    doc.moveDown();
    doc.fontSize(11).text(req.body.body, 80, doc.y);
    doc.moveDown(4);
    doc.fontSize(15).text("Derguesi: " + req.body.writer, 80, doc.y);

    doc.end();
  });
});

module.exports = app;
