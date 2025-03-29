import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; 
import authRoutes from './src/routes/auth.js'; // Ensure this path is correct

// Load environment variables
dotenv.config();

// Debugging: Check if environment variables are loaded
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('MONGO_URI:', process.env.MONGO_URI);

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());  // Parse JSON requests
app.use(cors());  // Enable CORS for frontend communication

// Routes
app.use("/api/auth", authRoutes);

// Port and MongoDB URI
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    // Start the server only after successful DB connection
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Default route for debugging
app.get("/", (req, res) => {
  res.send("API is running...");
});
