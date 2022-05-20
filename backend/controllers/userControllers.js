const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = expressAsyncHandler(async () => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password || !pic) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields",
        });
    }

    // Check if user already exists in mongoDB
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({
            status: "error",
            message: "User already exists",
        });
        throw new Error("User already exists");
    }

    const user = await User.create({ name, email, password, pic });
    if (user) {
        res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Failed to create user",
        });
        throw new Error("Failed to create user");
    }
});

module.exports = { registerUser };
