const mongoose= require("mongoose");
const validator=require("validator");
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
        required:true,
        validator(value){
         if(!validator.isEmail(value)){
            throw new error("inavlid error");
         }
        }
    },
    age:{
       type:Number
    },
    password:{
        type:String
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
                throw new Error("data invalid");
        }
    }
},{timestamps:true})
//! model object that allow you to  perform the database operations on a mongodb collection using the schema 
const user =mongoose.model("user",userSchema)  
module.exports= user;
