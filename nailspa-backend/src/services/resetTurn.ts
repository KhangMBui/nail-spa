import { Worker } from "../models";
import cron from "node-cron";

// Every day at 11:59 PM: reset worker's turn and availability
cron.schedule("59 23 * * *", async () => {
  await Worker.update({ turn: 0, isAvailable: true }, { where: {} });
  console.log("All workers' turn and availability reset.");
});
