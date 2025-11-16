import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { API_KEYS } from "./keyManager.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Example route to show key rotation
let keyIndex = 0;
function getNextApiKey() {
  const key = API_KEYS[keyIndex];
  keyIndex = (keyIndex + 1) % API_KEYS.length;
  return key;
}

app.post("/analyze", async (req, res) => {
  try {
    const apiKey = getNextApiKey();

    res.json({
      success: true,
      using_key: apiKey,
      message: "Analysis OK"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Analysis failed",
      details: err.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
