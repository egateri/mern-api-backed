const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const { serialize } =require('cookie');
const router = express.Router();

router.get("/logout", (req, res) => {
  const { cookies } = req;

  const jwt = cookies?.token;

  if (!jwt) {
    return res.status(401).json({
      status: 'error',
      error: 'Unauthorized',
    });
  }

  const serialized = serialize('token', null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  });
  res.setHeader('Set-Cookie', serialized);
  res.status(200).json({
    status: 'success',
    message: 'Logged out',
  });
});

module.exports = router;
