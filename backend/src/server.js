
import "dotenv/config";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import dns from "node:dns";


dns.setServers(["8.8.8.8"]);
const PORT = process.env.PORT || 3000;

try {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`API: http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Bağlanılamadı:", err.message);
  process.exit(1);
}
