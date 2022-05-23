const expressAsyncHandler = require("express-async-handler");
const { generateToken } = require("../config/generateToken");
const User = require("../models/userModel");

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
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
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({
            status: "error",
            message: "Failed to create user",
        });
        throw new Error("Failed to create user");
    }
});

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            status: "success",
            data: {
                user,
            },
            token: generateToken(user._id),
        });
    } else {
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "User does not exist",
            });
        } else
            return res.status(400).json({
                status: "error",
                message: "Incorrect password",
            });
    }
});

module.exports = {
    registerUser,
    authUser,
};
