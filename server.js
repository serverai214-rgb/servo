// backend/server.js
import express from "express";
import cors from "cors";
import { getBalancedKey, setKeyOnCooldown } from "./keyManager.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🔥 Cal AI Backend Running ✅");
});

app.get("/get-api-key", async (req, res) => {
  try {
    const key = await getBalancedKey();
    if (!key) return res.status(503).json({ error: "No API keys available" });
    res.json({ apiKey: key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/cooldown", (req, res) => {
  const { key } = req.body;
  if (!key) return res.status(400).json({ error: "Missing key" });
  setKeyOnCooldown(key);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
