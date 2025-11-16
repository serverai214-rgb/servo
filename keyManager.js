import dotenv from "dotenv";
import KeyPointer from "./keyPointerModel.js";

dotenv.config();

// Load all API keys from .env
export const API_KEYS = Object.entries(process.env)
  .filter(([key]) => key.startsWith("API_KEY_"))
  .map(([_, value]) => value.trim());

// Ensure keys loaded
if (API_KEYS.length === 0) {
  console.error("❌ No API keys loaded!");
}

// Function to get next rotating key
export const getNextApiKey = async () => {
  let pointer = await KeyPointer.findOne();

  // If first time, create pointer doc
  if (!pointer) {
    pointer = await KeyPointer.create({ index: 0 });
  }

  const currentIndex = pointer.index;
  const key = API_KEYS[currentIndex];

  // Move pointer to next index
  pointer.index = (currentIndex + 1) % API_KEYS.length;
  await pointer.save();

  return key;
};
