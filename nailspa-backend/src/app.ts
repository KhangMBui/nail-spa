import express from "express";
import cors from "cors";
import { ensureDatabaseExists } from "./config/database";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const startServer = async () => {
  await ensureDatabaseExists();

  // Import models and routes AFTER database is ensured
  const { syncDb } = await import("./models");
  const serviceRoutes = (await import("./routes/service")).default;
  const appointmentRoutes = (await import("./routes/appointment")).default;
  const workerRoutes = (await import("./routes/worker")).default;
  const incomeRoutes = (await import("./routes/income")).default;
  const userRoutes = (await import("./routes/user")).default;

  const app = express();
  const PORT = process.env.PORT || 5000;

  app.use(cors());
  app.use(express.json());

  // Swagger UI endpoint
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Use routes
  app.use("/api/workers", workerRoutes);
  app.use("/api/services", serviceRoutes);
  app.use("/api/appointments", appointmentRoutes);
  app.use("/api/incomes", incomeRoutes);
  app.use("/api/users", userRoutes);

  app.get("/", (req, res) => {
    res.json({ message: "Hello from Express + TypeScript!" });
  });

  await syncDb();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  });
};

startServer();
