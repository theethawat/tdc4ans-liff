import express from "express";
const path = require("path");
const app = express.Router();

app.use("/", express.static(path.join(__dirname, "../public")));

export default app;
