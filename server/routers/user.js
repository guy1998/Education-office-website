const express = require("express");
const app = express.Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const handler = require("../database/user-handler.js");
const authorize = require("../utilities/token.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  verifyEmail,
  verifyPasswordStrength,
  verifyUserNameStrength,
  passwordVerifier
} = require("../utilities/security-ground.js");
const userExistenceVerifier = require("../utilities/user-existence-verifier.js");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/admin/get", (req, res) => {
  authorize(req, res, () => {
    const tokens = req.cookies.tokenCookie;
    const decoded = jwt.verify(tokens.refreshToken, process.env.JWT_KEY);
    const user = {
      name: decoded.name,
      surname: decoded.surname,
      username: decoded.username,
      email: decoded.email
    };
    res.status(200).json(user);
  });
});

app.post("/admin/add", (req, res) => {
  authorize(req, res, async () => {
    if (!verifyEmail(req.body.email)) {
      res
        .status(400)
        .json(
          "Email nuk eshte valid!"
        );
      return;
    }
    try {
      await handler.generateUser({ ...req.body });
      res.status(200).json("Generated successfully!");
    } catch (err) {
      if(err.message === 'Nje perdorues me kete email ose emer perdoruesi ekziston tashme!'){
        res.status(400).json(err.message);
        return;
      }
      console.log("Could not generate due to an error: " + err);
      res.status(500).json("Server crashed!");
    }
  });
});

app.put("/admin/edit", (req, res) => {
  authorize(req, res, async () => {
    const existence = await userExistenceVerifier.verifyEditExistence(req);
    if (existence) {
      res
        .status(400)
        .json(
          "Nje perdorues me kete email ose emer perdoruesi ekziston tashme!"
        );
      return;
    } else if (!verifyUserNameStrength(req.body.username)) {
      res
        .status(400)
        .json(
          "Emri i perdoruesit duhet te jete te pakten 6 karaktere dhe te permbaje shkronja, numra, ose '-'"
        );
      return;
    } else if (!verifyEmail(req.body.email)) {
      res.status(400).json("Emaili nuk eshte i sakte");
      return;
    }

    const tokens = req.cookies.tokenCookie;
    const decoded = jwt.verify(tokens.refreshToken, process.env.JWT_KEY);
    handler.editUser(decoded._id, req.body).then(data => {
      if (data) {
        const accessToken = jwt.sign(
          { _id: decoded._id, ...req.body, password: decoded.password },
          process.env.JWT_KEY,
          { expiresIn: 900 }
        ); //15 minutes
        const refreshToken = jwt.sign(
          { _id: decoded._id, ...req.body, password: decoded.password },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        const tokenObject = {
          accessToken: accessToken,
          refreshToken: refreshToken
        };
        res.cookie("tokenCookie", tokenObject, {
          maxAge: 3600000,
          httpOnly: true,
          secure: true,
          sameSite: "none"
        });
        res.status(200).json(req.body);
      } else {
        res.status(500).json("Server crashed!");
      }
    });
  });
});

app.put("/admin/changePassword", (req, res) => {
  authorize(req, res, () => {
    const tokens = req.cookies.tokenCookie;
    const decoded = jwt.verify(tokens.refreshToken, process.env.JWT_KEY);
    if (!passwordVerifier(req.body.oldPassword, decoded.password)) {
      res.status(400).json("Fjalekalimi nuk eshte i sakte!");
      return;
    } else if (!verifyPasswordStrength(req.body.newPassword)) {
      res
        .status(400)
        .json(
          "Fjalekalimi i ri nuk eshte i sigurte. Ju lutem provoni nje fjalekalim me 8 karaktere, shkronja kapitale, shkronja te vogla, numra dhe karaktere speciale"
        );
      return;
    }

    handler
      .changePassword(decoded._id, req.body.newPassword)
      .then(data => {
        if (data) {
          const accessToken = jwt.sign(data, process.env.JWT_KEY, {
            expiresIn: 900
          }); //15 minutes
          const refreshToken = jwt.sign(data, process.env.JWT_KEY, {
            expiresIn: "1h"
          });
          const tokenObject = {
            accessToken: accessToken,
            refreshToken: refreshToken
          };
          res.cookie("tokenCookie", tokenObject, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: "none"
          });
          res.status(200).json(data);
        } else res.status(304).json("Could not change!");
      })
      .catch(err => {
        console.log(err);
        res.status(500).json("Server crashed!");
      });
  });
});

module.exports = app;
