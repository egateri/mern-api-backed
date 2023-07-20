const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const { serialize } =require('cookie');
const router = express.Router();

router.get("/loginwithcookie", (req, res) => {
  res
    .status(200)
    .json({ message: "To Login with Cookie. Please use the API POST Method" });
});


router.get("/loginwithcookietest", async (req, res) => {
try {
  

  // const { email, password } = req.body;
  const email = "eliud@eliud.com";
  const password = "eliud";

  if (!email || !password) {
    return res.status(401).json({
      status: 'error',
      error: 'Request missing email or password',
    });
  }
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "User does not exists" });
  }
  // console.log(process.env.NODE_ENV);
  // res.json(user);

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      const payload = {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      jwt.sign(
        payload,
        process.env.TOKEN_KEY,
        {
          expiresIn: 60 * 60 * 24 * 30,
        },
        (_err, token) => {
          const serialized = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
          res.setHeader('Set-Cookie', serialized);
          res.status(200).json({
            success: true,
            user: {
              id:payload.id,
              email: payload.email,
              first_name: payload.first_name,
              last_name: payload.last_name,
            },
          });
        },
      );
    } else {
      res.status(400).json({
        status: 'error',
        error: 'Password and email does not match.',
      });
    }
  });

}
catch (error) {

  console.log(error);
    res.status(500).json({
      status: 'error',
      error: 'Internal Server Error',
    });
 
}
 
});

router.post("/loginwithcookie", async (req, res) => {
  try {
    const { email, password } = req.body;

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
