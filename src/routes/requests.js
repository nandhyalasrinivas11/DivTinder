const express=require("express");
const requestRouter=express.Router();
const connectionRequestModel=require("../models/connectionRequestSchema.js")
const {userauth}=require("../middleware/auth")
const user=require("../models/user.js")

requestRouter.post("/request/send/:status/:touserId" ,userauth,async(req,res)=>{
try{
  const fromuserId=req.user._id;
  const touserId=req.params.touserId;
  const status=req.params.status


  // *This API is only for "interested" (or) "ignored"
  const value=["interested","ignored"]
  if(!value.includes(status)){
    return res.json({
        message:"Invalid status"
    })
  }
  
  if (fromuserId.toString() === touserId) {
  return res.status(400).json({
    message: "You cannot send a request to yourself"
  });
}

  //* if in case already request exist we cannot make request again
  const existconnectionRequest=await connectionRequestModel.findOne({
    $or:[
        {fromuserId,touserId},
        {fromuserId:touserId,touserId:fromuserId},
    ],
    
})

//* No user in Database
const touser = await user.findById(touserId);
if(!touser) return res.json({message:"there is no user in dataBase"})

  if(existconnectionRequest){
    return res.json({message:"request already exist"})
  }

  const connectionRequest=new connectionRequestModel({fromuserId,touserId,status});
  const data=await connectionRequest.save();
  res.json({
    message:req.user.firstName+" is "+status+ " in "+touser.firstName,
    data,
  })
  console.log(data)
}
catch(err){
    res.status(404).send("Connection failed")
}

})

module.exports=requestRouter