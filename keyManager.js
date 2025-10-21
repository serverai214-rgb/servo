import { API_KEYS } from "./apiKey.js";

// Safety check
if (API_KEYS.length === 0) {
  console.error("❌ No API keys found! Make sure they are set in Render environment variables.");
}

// 🔁 Round-robin pointer (starts from 0)
let pointer = 0;

/**
 * Returns the next API key in round-robin order.
 * Example: if 60 keys → 1st request gets key1, 2nd → key2, ... 61st → key1 again.
 */
export async function getBalancedKey() {
  if (API_KEYS.length === 0) {
    throw new Error("No API keys available");
  }

  // Pick current key
  const key = API_KEYS[pointer];

  // Move pointer to next key, looping back if end reached
  pointer = (pointer + 1) % API_KEYS.length;

  console.log(`🔁 API key assigned: ${key.slice(-6)} | Next pointer: ${pointer}`);
  return key;
}

/**
 * Cooldown placeholder — not used in round-robin mode
 * (kept for compatibility with existing routes)
 */
export function setKeyOnCooldown(key) {
  console.warn(`⚠️ Cooldown ignored (round-robin mode) for key ending with: ${key.slice(-6)}`);
}
