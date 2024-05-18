import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import adminListingroutes from "./routes/adminListingroutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3000"],

    methods: ["GET", "POST", "PUT", "DELETE", "UPDATE", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
connectDB();

app.use("/api", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/admin/auth", adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
