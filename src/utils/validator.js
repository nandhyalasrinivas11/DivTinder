const validator=require("validator");

const validSignupData=(req)=>{

    const { firstName, lastName, email } = req.body;

     if(!firstName){
        throw new Error("please enter firstname")
     }
     if(!lastName){
        throw new Error("please enter lasttname")
     }
     if(firstName.length <4 || lastName.length>50){
        throw new Error("name must in between the 5-49 characters")
     }
     if(!validator.isEmail(email)){
       throw new Error("inValid Email")
     }
}


const validateData=(req)=>{
const allowedModifyData=["firstName","lastName","age","gender"];
const responsed=Object.keys(req.body).every((field)=>allowedModifyData.includes(field))
return responsed; 
}
module.exports={validSignupData,validateData};
