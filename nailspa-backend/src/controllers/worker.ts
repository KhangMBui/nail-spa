import { Request, RequestHandler, Response } from "express";
import { Worker, WorkerArrival } from "../models";

export const WorkerController = {
  getAll: async (req: Request, res: Response) => {
    const workers = await Worker.findAll();
    res.json(workers);
  },
  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const worker = await Worker.findByPk(id);
    if (worker) res.json(worker);
    else res.status(404).json({ message: "Worker not found" });
  },
  add: async (req: Request, res: Response) => {
    const worker = await Worker.create(req.body);
    res.status(201).json(worker);
  },
  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [updated] = await Worker.update(req.body, { where: { id } });
    if (updated) {
      const updatedWorker = await Worker.findByPk(id);
      res.json(updatedWorker);
    } else {
      res.status(404).json({ message: "Worker not found" });
    }
  },
  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await Worker.destroy({ where: { id } });
    if (deleted) res.json({ message: "Worker removed" });
    else res.status(404).json({ message: "Worker not found" });
  },
  checkin: (async (req: Request, res: Response) => {
    const { name, passcode } = req.body;
    const worker = await Worker.findOne({ where: { name, passcode } });
    if (!worker) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Get today's date
    const today = new Date().toISOString().slice(0, 10);

    // Count how many arrivals today to determine arrivalOrder
    const count = await WorkerArrival.count({
      where: { arrivalDate: today },
    });

    // Check if this user has checked in today
    const alreadyCheckedIn = await WorkerArrival.findOne({
      where: {
        workerId: worker.getDataValue("id"),
        arrivalDate: today,
      },
    });

    if (alreadyCheckedIn) {
      return res.status(400).json({ error: "Already checked in today" });
    }

    // Add to workerArrival table
    await WorkerArrival.create({
      workerId: worker.getDataValue("id"),
      arrivalDate: today,
      arrivalOrder: count + 1,
    });

    res.json({ message: "Checked in", workerId: worker.getDataValue("id") });
  }) as RequestHandler,
};
