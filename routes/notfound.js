
const express = require('express');
const router = express.Router();


router.get('*',(req, res)=>{

   
     res.status(401).json({message:"Resource Not Found. Please verify the API endpoint"})

});

router.post('*',(req, res)=>{

   return res.status(401).json({message:"Resource Not Found. Please verify the API endpoint"})

});
router.put('*',(req, res)=>{

    return res.status(401).json({message:"Resource Not Found. Please verify the API endpoint"})
 
 });
 router.delete('*',(req, res)=>{

    return res.status(401).json({message:"Resource Not Found. Please verify the endpoint"})
 
 });
 router.patch('*',(req, res)=>{

    return res.status(401).json({message:"Resource Not Found. Please verify the API endpoint"})
 
 });
module.exports =router;