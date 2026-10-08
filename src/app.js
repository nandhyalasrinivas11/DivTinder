const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

//! creating a API 
//! adding the data to Database
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

//! fetching the data using name
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

//! fetching the overallData 
app.get("/feed", async (req, res) => {
    const firstName = req.body.firstName;

    try {
        const user = await User.find({});

        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//! Deletion 
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

//! updating the data
app.patch("/update",async (req,res)=>{
    const firstName=req.body.firstName;
    const data=req.body;
    try{
        await User.findOneAndUpdate({firstName:firstName},data)
        res.send("Data updated successfully");
    }
    catch(err){
        res.status(404).send("Data Not updated")

    }
})

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

startServer();