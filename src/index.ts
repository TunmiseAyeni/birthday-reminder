import express from "express";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/userRoutes";
import { startCronJob, runNow } from "./services/cronService";
import "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Birthday Reminder App is running! 🎂" });
});

// Test route — trigger the birthday check manually
app.get("/api/run-birthday-check", async (req, res) => {
  await runNow();
  res.json({ message: "Birthday check ran — see terminal for results." });
});

// Start the cron job
startCronJob();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
