import { db } from "./db.js";
import { API_KEYS } from "./apiKey.js";

const settings = db.collection("settings");

export async function getBalancedKey() {
  if (API_KEYS.length === 0) throw new Error("No API keys available");

  const doc = await settings.findOne({ _id: "api_pointer" });
  let pointer = doc?.value ?? 0;

  const key = API_KEYS[pointer];
  const nextPointer = (pointer + 1) % API_KEYS.length;

  await settings.updateOne(
    { _id: "api_pointer" },
    { $set: { value: nextPointer } },
    { upsert: true }
  );

  console.log(`🔁 API key assigned: ${key.slice(-6)} | Next pointer: ${nextPointer}`);
  return key;
}

export function setKeyOnCooldown(key) {
  console.warn(`⚠️ Cooldown ignored for key ending with: ${key.slice(-6)}`);
}
