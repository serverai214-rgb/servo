import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { getNextApiKey } from "./keyManager.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// ✅ FIX: Return API key on GET /
app.get("/", async (req, res) => {
  try {
    const apiKey = await getNextApiKey();
    res.json({ apiKey });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// Your existing analyze route
app.post("/analyze", async (req, res) => {
  try {
    const apiKey = await getNextApiKey();
    res.json({
      success: true,
      message: "Analysis OK",
      using_key: apiKey
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Running on ${PORT}`));
