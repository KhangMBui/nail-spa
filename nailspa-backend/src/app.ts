import express from "express";
import cors from "cors";
import serviceRoutes from "./routes/service";
import appointmentRoutes from "./routes/appointment";
import workerRoutes from "./routes/worker";
import incomeRoutes from "./routes/income";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use routes
app.use("./api/workers", workerRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/income", incomeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express + TypeScript!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
