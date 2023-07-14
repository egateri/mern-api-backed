
const express = require('express');
const router = express.Router();
router.get('*',(req, res)=>{

    res.send("Page not Found")

});

router.post('*',(req, res)=>{

   return res.status(401).json({message:"page not found"})

});
router.put('*',(req, res)=>{

    return res.status(401).json({message:"page not found"})
 
 });
 router.delete('*',(req, res)=>{

    return res.status(401).json({message:"page not found"})
 
 });
 router.patch('*',(req, res)=>{

    return res.status(401).json({message:"page not found"})
 
 });
module.exports =router;