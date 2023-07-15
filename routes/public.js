const USer = require("../model/user");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  
    res.status(200).json({message:"Welcome! API documentation will go here!"});
  
  });
  
  router.post("/",(req, res) => {
   
    res.status(200).json({message:"Welcome! API documentation will go here!"});
  
  });

router.get("/public", (req, res) => {
  
  res.status(200).json({message:"This is a public API. No authorization Required"});

});

router.post("/public",(req, res) => {
 
  res.status(200).json({message:"This is a public API. No authorization Required"});

});



module.exports = router;
