import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const url = process.env.DB_URL + process.env.DB_NAME;
console.log(url);
export const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        if (!conn) throw new Error("failed to connect with database.");
        console.log(`connected with host ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        console.log("failed to connect with database:");
    }
};
