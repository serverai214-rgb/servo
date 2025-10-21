import express from "express";
import cors from "cors";
import { getBalancedKey, setKeyOnCooldown } from "./keyManager.js";

const app = express();

// ✅ CORS for frontend
app.use(cors());

// ✅ Limit incoming JSON payloads (safety)
app.use(express.json({ limit: "5mb" }));

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🔥 Cal AI Backend Running ✅");
});

// ✅ Get least-used API key
app.get("/get-api-key", async (req, res) => {
  try {
    const key = await getBalancedKey();
    if (!key) {
      return res.status(503).json({ error: "No API keys available" });
    }
    res.json({ apiKey: key });
  } catch (err) {
    console.error("❌ Error fetching API key:", err);
    res.status(500).json({ error: "Error, please try again" });
  }
});

// ✅ Put a key on cooldown manually
app.post("/cooldown", (req, res) => {
  try {
    const { key } = req.body;
    if (!key) return res.status(400).json({ error: "Missing key" });

    setKeyOnCooldown(key);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Cooldown error:", err);
    res.status(500).json({ error: "Error, please try again" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
