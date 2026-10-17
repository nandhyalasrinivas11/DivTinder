const express=require("express");
const profileRouter=express.Router();
const User = require("../models/user");
const {userauth}=require("../middleware/auth")


profileRouter.use(express.json())


//! implement the auth middleware in validation 
profileRouter.get("/profile", userauth,async (req,res)=>{
 try{
    const userdata=req.user
   console.log(userdata)
   res.send(userdata)
 }
 catch(err){
    res.status(404).send("something wrong in the app.js")
 }
 
})


module.exports=profileRouter