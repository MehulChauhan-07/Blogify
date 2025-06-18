import express from "express";

// routes
import apiRoutes from "./routes/apiRoutes.js";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Blogify API",
        version: "1.0.0",
    });
});
app.get("/api", apiRoutes);

export default app;