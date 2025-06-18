import express from "express";

const router = express.Router();

export default router.get("/", (req, res) => {
    res.json({ message: "Hello, Welcome from Blogify" });
});

