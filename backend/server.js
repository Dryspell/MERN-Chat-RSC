const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");

const app = express();

app.get("/", (req, res) => {
    res.send("API is working");
});

app.get("/api/chats", (req, res) => {
    res.send(chats);
});

app.get("/api/chats/:id", (req, res) => {
    const chat = chats.find((chat) => chat._id === req.params.id);
    if (chat) {
        res.send(chat);
    } else {
        res.status(404).send({ message: "Chat not found" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
