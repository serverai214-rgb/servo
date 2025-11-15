import dotenv from "dotenv";
dotenv.config();

// Load all keys starting with API_KEY_
export const API_KEYS = Object.entries(process.env)
  .filter(([key]) => key.startsWith("API_KEY_"))
  .map(([_, value]) => value.trim());

if (API_KEYS.length === 0) {
  console.error("❌ No API keys loaded!");
}
