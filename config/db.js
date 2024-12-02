import mongoose from "mongoose";
import env from "dotenv";
env.config();

const connectDB = async () => {
    try {
        const db = mongoose.connect(process.env.DB_URI);
        console.log("Database Connected");

    } catch (error) {
        console.log("Database Error", error);
    }
}

export default connectDB;