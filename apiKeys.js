// backend/apiKeys.js
import dotenv from "dotenv";
dotenv.config();

export const API_KEYS = Object.entries(process.env)
  .filter(([k]) => k.startsWith("API_KEY_"))
  .map(([_, v]) => v.trim());

if (API_KEYS.length === 0) {
  console.error("❌ No API keys loaded! Check your environment variables.");
}
