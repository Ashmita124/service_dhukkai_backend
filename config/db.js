const mongoose = require("mongoose");

const connectDB = async () => {

    try {
        await mongoose.connect("mongodb://localhost:27017/db_wise_academy");
        console.log("MongoDb connected")
    } catch (e) {
        console.log("MongoDb connection failed");

    }
}

module.exports = connectDB;