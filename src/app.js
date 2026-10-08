const express = require("express");
const { connectDB } = require("./config/database");

const app = express();
const User= require("./models/user");


app.use(express.json())

app.post("/signup",async (req,res)=>{
    
   
    //! creating a API 
    const userdata=req.body;
  

const user=new User(userdata)
await user.save();
res.send("Data posted")

})


const startServer = async () => {
    try {
        await connectDB();

        app.listen(5555, () => {
            console.log("server running at the port 5555....");
        });
    } catch (err) {
        console.log("Server not started because MongoDB connection failed");
    }
};

startServer();