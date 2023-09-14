import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL: string = process.env.DB_URL as string;

const connect = async (): Promise<void> => {
    try {
        const db = await mongoose.connect(DB_URL);
        const { name, host } = db.connection;
        console.log(`Connect to: ${name} host: ${host}`);
    } catch (error) {
        console.log(`Connection error: ${error}`);
    }
};

export { connect };