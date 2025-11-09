import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const DBConnection = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        console.error("Exiting application due to database connection failure...");
        process.exit(1); // Exit the app if DB connection fails
    }
}

// Handle connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Handle disconnection
mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...');
});

// Handle successful reconnection
mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected successfully');
});