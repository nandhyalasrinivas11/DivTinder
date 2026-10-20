const express=require("express");

const authRouter=express.Router();
const User = require("../models/user");
const bcrypt=require("bcrypt")
const {userauth}=require("../middleware/auth")
const {validSignupData}=require("../utils/validator");
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")

authRouter.use(express.json())
authRouter.use(cookieParser())

authRouter.post("/login",async (req,res)=>{
   const {email,password}=req.body;
   try{
    const user=await User.findOne({email:email})
    if(!user){

        throw new Error("user not in Database");
    }
   const isPassword=await bcrypt.compare(password,user.password)

    if(isPassword){
     //* create a JWT Token
     const token=await jwt.sign({_id:user._id},"srinivas123")
     console.log(token)
      //* Add token to the cookie and send response to the user 
     res.cookie("token",token);
    res.send("user login successfuly");
   }
   else res.send("inValid password")
}

   catch(err){
      res.send("ERROR"+err)
   }
})


authRouter.post("/signup",async (req,res)=>{  
    
    try{
        //*  validate the data
        validSignupData(req);
         //* Encrypting the password
         const {firstName,lastName,age,password,gender,email}=req.body;
         
         const passwordhash=await bcrypt.hash(password,10);
         console.log(passwordhash)
        
        const user=new User({
            firstName,
            lastName,
            age,
            gender,
            email,
            password:passwordhash
        })
        await user.save();
        res.send("Data posted")
}

 catch (err) {
    res.status(400).send("ERROR: " + err.message);
}
})


authRouter.post("/logout",(req,res)=>{
     res.cookie("token",null,{
        expries:new Date(Date.now())
     })
     res.send("user Logout succesfully")
})


module.exports=authRouter;