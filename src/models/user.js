const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    firstName:{
      type:String,
      required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    age:{
       type:Number
    },
    gender:{
        type:String
    }
})

module.exports=  mongoose.model("user",userSchema);
