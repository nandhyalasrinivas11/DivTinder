const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://nandyalasrinivas11_db_user:LF6cr0owW9FR4u5j@cluster0.dustxvt.mongodb.net/"
        );

        console.log("MongoDB connected successfully");
    } catch (err) {
        console.log("MongoDB connection failed:", err);
        // throw err;
    }
};

module.exports = { connectDB };



