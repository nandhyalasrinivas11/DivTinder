const express= require("express");

const app=express();


app.use("/test",(req,res)=>{
   res.send("testing from the server");
})
app.use("/home",(req,res)=>{
   res.send("showing home page");
})
app.use((req,res)=>{
   res.send("hi srinivas");
})
app.listen(5555,()=>{
    console.log("server running at the port 5555....")
})