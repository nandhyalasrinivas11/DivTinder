const express= require("express");

const app=express();


app.use("/test",(req,res)=>{
   res.send("testing from the server");
})

app.get("/user",(req,res)=>{
  res.send(
   {"firstname":"srinivas","age":19}
);
})

app.post("/user",(req,res)=>{
   res.send("posted succesfully")
})

app.delete("/user",(req,res)=>{
   res.send("delete sucessfully")
})
app.listen(5555,()=>{
    console.log("server running at the port 5555....")
})