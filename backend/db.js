const mongoose = require("mongoose");
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const connectDB = async () => {
    try {
     //   const mongoUrl=process.env.DB_URL;
        const localMongoUrl=process.env.LOCAL_DB_URL;
        await mongoose.connect(localMongoUrl);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err);
    }
};
mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully");
});
mongoose.connection.on('error', (err) => {
    console.log("MongoDB connection error:", err);
});
module.exports = connectDB;