import { Request, Response } from "express";
import { WorkerModel } from "../models/worker";

export const WorkerController = {
  getAll: (req: Request, res: Response) => {
    res.json(WorkerModel.getAll());
  },

  getById: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const worker = WorkerModel.getById(id);
    if (worker) {
      res.json(worker);
    } else {
      res.status(404).json({ message: "Worker not found" });
    }
  },

  add: (req: Request, res: Response) => {
    const worker = WorkerModel.add(req.body);
    res.status(201).json(worker);
  },

  update: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const worker = WorkerModel.update(id, req.body);
    if (worker) {
      res.json(worker);
    } else {
      res.status(404).json({ message: "Worker not found" });
    }
  },

  remove: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const success = WorkerModel.remove(id);
    if (success) {
      res.json({ message: "Worker removed" });
    } else {
      res.status(404).json({ message: "Worker not found" });
    }
  },
};
