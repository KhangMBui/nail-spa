import { Request, Response } from "express";
import { ServiceModel } from "../models/service";

export const ServiceController = {
  getAll: (req: Request, res: Response) => {
    res.json(ServiceModel.getAll());
  },
  getById: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const service = ServiceModel.getById(id);
    if (service) res.json(service);
    else res.status(404).json({ message: "Service not found" });
  },
  add: (req: Request, res: Response) => {
    const service = ServiceModel.add(req.body);
    res.status(201).json(service);
  },
  update: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const service = ServiceModel.update(id, req.body);
    if (service) res.json(service);
    else res.status(404).json({ message: "Service not found" });
  },
  remove: (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const success = ServiceModel.remove(id);
    if (success) res.json({ message: "Service removed" });
    else res.status(404).json({ message: "Service not found" });
  },
};
