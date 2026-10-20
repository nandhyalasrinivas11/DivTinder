const mongoose=require("mongoose");

const connectRequestSchema=new mongoose.Schema({
    
    fromuserId:{
      type:mongoose.Schema.Types.ObjectId,
      required:true,
    },

    touserId:{
       type:mongoose.Schema.Types.ObjectId,
      required:true,
    },

    status: {
    type: String,
    required: true,
    enum: {
        values: ["accepted", "rejected", "ignore", "interested"],
        message: "{VALUE} is not a valid status"
    }
}
},{timestamps:true})
const connectionRequestModel= mongoose.model("connectionRequest",connectRequestSchema);

module.exports=connectionRequestModel