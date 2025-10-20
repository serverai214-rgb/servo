import { API_KEYS } from "./apiKey.js";

if (API_KEYS.length === 0) {
  console.error("❌ No API keys found! Make sure they are set in Render environment variables.");
}

// Each key stores usage + cooldown
const usageStats = new Map(API_KEYS.map((k) => [k, { used: 0, cooldown: false }]));
const requestQueue = [];
let processing = false;

const COOLDOWN_TIME_MS = 10_000; // 10 seconds

// Pick the least-used key that isn't cooling down
function getLeastUsedKey() {
  const available = Array.from(usageStats.entries())
    .filter(([_, v]) => !v.cooldown)
    .sort((a, b) => a[1].used - b[1].used);

  return available.length ? available[0][0] : null;
}

// Sequential request queue processor
async function processQueue() {
  if (processing || requestQueue.length === 0) return;
  processing = true;

  while (requestQueue.length > 0) {
    const resolve = requestQueue.shift();
    const key = getLeastUsedKey();

    if (!key) {
      // Wait a bit if all keys are cooling down
      await new Promise((r) => setTimeout(r, 1000));
      requestQueue.unshift(resolve);
      continue;
    }

    usageStats.get(key).used += 1;
    resolve(key);
  }

  processing = false;
}

// Expose a Promise that resolves with the next key
export function getBalancedKey() {
  return new Promise((resolve) => {
    requestQueue.push(resolve);
    processQueue();
  });
}

// Put a key on temporary cooldown
export function setKeyOnCooldown(key) {
  const info = usageStats.get(key);
  if (!info) return;

  info.cooldown = true;
  console.warn(`⚠️ Key on cooldown for ${COOLDOWN_TIME_MS / 1000}s`);

  setTimeout(() => {
    info.cooldown = false;
    console.log(`✅ Key reactivated`);
  }, COOLDOWN_TIME_MS);
}
