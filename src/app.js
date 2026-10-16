const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const User = require("./models/user");
const {validSignupData}=require("./utils/validator");
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const {userauth}=require("./middleware/auth")

app.use(express.json()); //! express middleware 
app.use(cookieParser())
//! creating a API 
//! static data adding (API)
app.post("/userData",async (req,res)=>{
    const userdata={  
    firstName:"MS",
    lastName:"Dhoni",
    gender:"male",
    age:44,
    email:"Dhoni@gmail.com"
}
const user=new User(userdata)
try{
  await user.save();
   res.send("Data posted")
}
catch(err){
    re.status(404).send("Data not posted")
}
})


//! Login API(Authentication)
app.post("/login",async (req,res)=>{
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

//! validating the cookie
app.get("/profile1", async (req,res)=>{
 console.log("Profile route called!");

 const cookies=req.cookies;

 const {token}=cookies
 //* validate the cookie
 const decodedmessage=await jwt.verify(token,"srinivas123")
 const {_id}=decodedmessage
 console.log("logged in user is: "+_id)
 const userdata=await User.findById({_id:_id})
console.log(userdata)
res.send(userdata)
})

//! implement the auth middleware in validation 
app.get("/profile2", userauth,async (req,res)=>{
 try{
    const userdata=req.user
   console.log(userdata)
   res.send(userdata)
 }
 catch(err){
    res.status(404).send("something wrong in the app.js")
 }
 
})

//! Dynamic data adding (API)
//! creating a API 
app.post("/Dynamicsignup",async (req,res)=>{  
    //*  validate the data

    try{
const userdata=req.body;
const user=new User(userdata)
await user.save();
res.send("Data posted")
}
  catch(err){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
     res.status(400).send("Fill the Details of the user");
  }
})

// ! encrytingPassword and  validate the data Before storing into the database
app.post("/usingValidatorsignup1",async (req,res)=>{  
    //*  validate the data

    try{
        validSignupData(req);
         //* Encrypting the password
         const  password=req.body.password
         const passwordhash=await bcrypt.hash(password,10);
         console.log(passwordhash)
        const userdata=req.body;
        const user=new User(userdata)
        await user.save();
        res.send("Data posted")
}

 catch (err) {
    res.status(400).send("ERROR: " + err.message);
}
})

//! encrypted password showed in badatabase
app.post("/usingValidatorsignup2",async (req,res)=>{  
    //*  validate the data

    try{
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

//! fetching the data using name (API)
app.get("/signup", async (req, res) => {
    const firstName = req.body.firstName;

    try {
        const user = await User.find({ firstName: firstName });
        if(user.length === 0){
            res.status(404).send("data not Found");
        }
        else{
            res.send(user);
        }
        
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//! fetching the overallData (API)
app.get("/feed", async (req, res) => {
    const firstName = req.body.firstName;

    try {
        const user = await User.find({});

        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//! Deletion (API)
app.delete("/delete",async (req,res)=>{
      const firstName=req.body.firstName;
      try{
        const user=await User.findOneAndDelete(firstName);
        res.send("user deleted successfully")
      }
      catch(err){
           res.status(404).send("user not found");
      }
})

//! updating the data (API)
app.patch("/update", async (req, res) => {
    const { firstName, ...data } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { firstName },
            { $set: data },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.send(user);
    } catch (err) {
        console.log(err); // Check the actual error
        res.status(400).send("Data Not updated");
    }
});

//! server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(5555, () => {
            console.log("Server running at port 5555....");
        });
    } catch (err) {
        console.log("Server not started because MongoDB connection failed");
    }
};

startServer()