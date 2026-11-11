
import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "ÖĞRENCİ_NUMARANI_BURAYA_YAZ"
  });
});

app.use("/events", eventRoutes);

// Bulunamayan adresler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found"
    }
  });
});

export default app;
