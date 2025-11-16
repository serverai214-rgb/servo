import { API_KEYS } from "./apiKey.js";

// Log if keys missing
if (!API_KEYS || API_KEYS.length === 0) {
  console.error("❌ No API keys loaded from environment variables!");
}

// Round-robin pointer
let pointer = 0;

/**
 * Returns the next API key in perfect round-robin rotation.
 * Example: 1→2→3→...→60→1→2→...
 */
export async function getBalancedKey() {
  try {
    // If no keys → return null safely (frontend won’t JSON.parse crash)
    if (!API_KEYS || API_KEYS.length === 0) {
      console.error("❌ No API keys available!");
      return null;
    }

    // Get current key
    const key = API_KEYS[pointer];

    // If key is undefined → skip
    if (!key) {
      console.error(`⚠️ API key at index ${pointer} is undefined. Skipping.`);
      pointer = (pointer + 1) % API_KEYS.length;
      return null;
    }

    // Move pointer to next index
    pointer = (pointer + 1) % API_KEYS.length;

    console.log(`🔁 Key used: ${key.slice(-6)} | Next pointer → ${pointer}`);

    return key;
  } catch (err) {
    console.error("❌ Error in getBalancedKey():", err);
    return null;
  }
}

/**
 * Cooldown placeholder (unused in pure round-robin mode).
 */
export function setKeyOnCooldown(key) {
  if (key) {
    console.warn(`⚠️ Cooldown ignored for key ending with ${key.slice(-6)}`);
  } else {
    console.warn("⚠️ Cooldown ignored: key was null/undefined");
  }
}
