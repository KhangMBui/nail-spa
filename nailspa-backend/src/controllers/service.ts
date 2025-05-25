import { Request, Response } from "express";
import { Service } from "../models";

export const ServiceController = {
  getAll: async (req: Request, res: Response) => {
    const services = await Service.findAll();
    res.json(services);
  },
  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const service = await Service.findByPk(id);
    if (service) res.json(service);
    else res.status(404).json({ message: "Service not found" });
  },
  add: async (req: Request, res: Response) => {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  },
  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [updated] = await Service.update(req.body, { where: { id } });
    if (updated) {
      const updatedService = await Service.findByPk(id);
      res.json(updatedService);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  },
  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await Service.destroy({ where: { id } });
    if (deleted) res.json({ message: "Service removed" });
    else res.status(404).json({ message: "Service not found" });
  },
};
