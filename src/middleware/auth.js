const jwt=require("jsonwebtoken");
const user=require("../models/user")

const userauth=async (req,res,next)=>{

   try{
   const cookie=req.cookies;
   
   const {token}=cookie
   if(!token){
    res.status(404).send("there is not token")
   }
   //* validate the cookie
   const decodedmsg=await jwt.verify(token,"srinivas123")

   const {_id}=decodedmsg;
   const userData=await user.findById(_id);
   if(!userData) {
    throw new Error("no user")
   }
    req.user = userData;
   console.log(userData);
   next()
}
catch(err){
    res.status(400).send(err);
}
}

module.exports={userauth}