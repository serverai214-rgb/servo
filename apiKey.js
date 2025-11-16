import dotenv from "dotenv";
dotenv.config();

// Load all API_KEY_* from environment variables
export const API_KEYS = Object.entries(process.env)
  .filter(([key]) => key.startsWith("API_KEY_"))
  .map(([_, value]) => value?.trim())
  .filter(Boolean); // removes undefined or empty ones

// Safety check
if (API_KEYS.length === 0) {
  console.error("❌ No API keys loaded! Check your .env file or Render environment variables.");
} else {
  console.log(`🔑 Loaded ${API_KEYS.length} API keys`);
}
