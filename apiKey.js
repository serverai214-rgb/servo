import dotenv from "dotenv";
dotenv.config();

// Load all API_KEY_* from environment
export const API_KEYS = Object.entries(process.env)
  .filter(([k]) => k.startsWith("API_KEY_"))
  .map(([_, v]) => v?.trim())
  .filter(Boolean);

if (API_KEYS.length === 0) {
  console.error("❌ No API keys loaded!");
} else {
  console.log(`🔑 Loaded ${API_KEYS.length} API keys`);
}
