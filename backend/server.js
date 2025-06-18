import express from 'express';
import { createServer } from 'http';

import dotenv from 'dotenv';
import app from "./app.js";

// Load environment variables from .env file
dotenv.config();

const server = createServer(app);

const startServer = async () => {
    try{
        const port = process.env.port;

        server.listen(port, () =>{
            console.log(`Server is running on port ${port}`);
            console.log(`Visit http://localhost:${port}`);
        })
    } catch (error){
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Handle process termination
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    server.close(() => {
        console.log("Process terminated");
        process.exit(0);
    });
});

// Start the server
startServer();
