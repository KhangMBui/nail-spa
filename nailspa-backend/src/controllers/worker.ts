import { Request, Response } from "express";
import { Worker } from "../models";

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
};
