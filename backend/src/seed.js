import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";
import dns from "node:dns";

dns.setServers(["8.8.8.8"]);
try {
  await connectDatabase();

  await Event.deleteMany({});

  const created = await Event.insertMany(seedEvents);

  console.log(`${created.length} etkinlik eklendi`);
} catch (err) {
  console.error("Seed hatası:", err.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}