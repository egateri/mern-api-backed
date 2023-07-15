const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {

  res.status(200).json({message:"To Login with Token. PLease use the API POST Method"});
});

router.post("/login", async (req, res) => {
  try {
    // const { email, password } = req.body;
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
      return res.status(400).json({ message: "All inputs are required" });
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    await bcrypt
      .compare(password, user.password)
      .then((result) => {
        // console.log(result);
        if (result) {
          const token = jwt.sign(
            { user_id: user._id, name: user.first_name, email },
            process.env.TOKEN_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );

          user.token = token;

          return res
            .status(200)
            .json({
              message: "Success",
              user_id: user._id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              token: user.token,
            });
        } else {
          return res.status(201).json({ message: "Invalid Credentials" });
        }
      })
      .catch((err) => {
        return res.status(400).json({ message: "Errors" });
      });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
