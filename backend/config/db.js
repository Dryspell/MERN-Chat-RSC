const mongoose = require("mongoose");
const color = require("colors");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.MONGO_URI}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(
            `MongoDB Connected to ${connection.connection.host}`.cyan.underline
                .bold
        );
    } catch (err) {
        console.error(`Error: ${err.message}`.red.bold);
        process.exit();
    }
};

module.exports = connectDB;
