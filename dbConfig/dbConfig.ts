import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

export default async function dbConnect(): Promise<void> {

    // ✅ Prevent multiple connections in serverless
    if (connection.isConnected === 1 || connection.isConnected === 2) {
        console.log("Already connected or connecting to MONGDB.");
        return;
    }


    try {
        const uri = process.env.MONGODB_URI;
        if (!uri)
            throw new Error("Please add MONGO DB URI value in .env.local");

        const db = await mongoose.connect(uri);
        connection.isConnected = db.connections[0].readyState;

        if (connection.isConnected === 2) {
            console.log("✅ MongoDB connected successfully");
        } else {
            console.log("⚠️ MongoDB connection state:", connection.isConnected);
        }

    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }

};