const User = require("../model/user");
const verifyToken = require("../middleware/auth");
const verifyCookie = require("../middleware/authwithcookie");
const express = require("express");
const router = express.Router();

router.get("/authwithtoken", verifyToken, (req, res) => {
  const { name, user_id, email } = req.user;

  res
    .status(200)
    .json({ message: "Welcom Home:  " + name + " of email: " + email });
});

router.post("/authwithtoken", verifyToken, (req, res) => {
  const { name, user_id, email } = req.user;
  res.status(200).json({ message: "Success", name: name });
});

router.get("/authwithcookie", verifyCookie, (req, res) => {
  const { name, user_id, email } = req.user;

  res
    .status(200)
    .json({ message: "Welcom Home:  " + name + " of email: " + email });
});

router.post("/authwithcookie", verifyCookie, (req, res) => {
  const { name, user_id, email } = req.user;
  res.status(200).json({ message: "Success", name: name });
});

module.exports = router;
