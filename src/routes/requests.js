const express=require("express");
const requestRouter=express.Router();
const connectionRequestModel=require("../models/connectionRequestSchema.js")
const {userauth}=require("../middleware/auth")

requestRouter.post("/request/send/interested/:touserId" ,userauth,async(req,res)=>{
try{
  const fromuserId=req.user._id;
  const touserId=req.params.touserId;
  const status="interested"
  const connectionRequest=new connectionRequestModel({fromuserId,touserId,status});
  const data=await connectionRequest.save();
  res.json({
    message:"connect request accepted",
    data,
  })
  console.log(data)
}
catch(err){
    res.status(404).send("Connection failed")
}

})

module.exports=requestRouter