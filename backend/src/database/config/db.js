import mongoose from "mongoose";
import config from "./config.js";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const connectDB = async () => {
    try {
        await mongoose.connect(dbConfig.database);
        console.log("✅ MongoDB connection established successfully.");
    } catch (error) {
        console.error("❌ Unable to connect to MongoDB:", error.message);
        process.exit(1);
    }
};

export { connectDB };
