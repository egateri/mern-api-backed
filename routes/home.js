const USer = require('../model/user');
const verifyToken = require('../middleware/auth');
const express = require('express');
const router = express.Router();
router.get('/',verifyToken,(req, res)=>{

const {name,user_id, email} = req.user;

    res.send("Welcom Home:  "+name+ " of email: "+email)

});

router.post('/',verifyToken,(req,res)=>{
    const {name,user_id, email} = req.user;
    res.status(200).json({message:"Success",name:name})
});




module.exports =router;