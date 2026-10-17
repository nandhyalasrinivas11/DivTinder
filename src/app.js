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

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use("/", authRouter);
app.use("/", profileRouter);


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