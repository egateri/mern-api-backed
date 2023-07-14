const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Register here!");
});

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!(email && password && first_name && last_name)) {
      return res.status(400).json({ message: "All inputs are required" });
      // res.status(400).send("All inputs are required");
    }

    const existingUser = await User.findOne({ email:email});

    if (existingUser) {
      return res.status(201).json({ message: "User Already exists. Please Login" });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      //    console.log("Encrypted password  "+encryptedPassword);
      const user = await User.create({
        first_name,
        last_name,
        email: email,
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN, }
      );
      user.token = token;

      return res.status(201).json({message:"success", user:user});
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
