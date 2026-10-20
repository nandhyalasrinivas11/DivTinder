const express=require("express");
const profileRouter=express.Router();
const User = require("../models/user");
const {userauth}=require("../middleware/auth")
const {validateData}=require("../utils/validator")

profileRouter.use(express.json())


//! implement the auth middleware in validation 
profileRouter.post("/profile/view", userauth,async (req,res)=>{
 try{
    const userdata=req.user
   console.log(userdata)
   res.send(userdata)
 }
 catch(err){
    res.status(404).send("something wrong in the app.js")
 }
 
})

profileRouter.post("/profile/edit",userauth ,(req,res)=>{
   try{
      if(validateData(req)===false){
       throw new Error("Not able to modify the data");
      }
      
      const loggeduser=req.user;
      Object.keys(req.body).forEach((key)=>{loggeduser[key]=req.body[key]});
       
      res.send("Data updated succesfully");
      loggeduser.save()
      console.log(loggeduser);
     
   }
   catch(err){
     res.status(404).send("ERROR"+err);
   }
})


profileRouter.patch("/profile/forgotPassword",userauth,(req,res)=>{
   try{
      const loggeduser=req.user;
      loggeduser.password=req.body.password;
      loggeduser.save();
      res.send("password updated successful");
   }
   catch(err){
      res.status(404).send("ERROR : "+err);
   }
})


module.exports=profileRouter