import mongoose from "mongoose";
import { env } from "./env.js";

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  if (isConnected) {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
  process.exit(0);
});
