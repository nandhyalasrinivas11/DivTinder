const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.get("/signup", async (req, res) => {
    const firstName = req.body.firstName;

    try {
        const user = await User.find({ firstName: firstName });

        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.get("/feed", async (req, res) => {
    const firstName = req.body.firstName;

    try {
        const user = await User.find({});

        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

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