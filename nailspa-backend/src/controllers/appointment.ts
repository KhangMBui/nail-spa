import { Request, Response } from "express";
import { AppointmentModel } from "../models/appointment";

export const AppointmentController = {
  getAll: (req: Request, res: Response) => {
    res.json(AppointmentModel.getAll());
  },
  getById: (req: Request, res: Response) => {
    const id = req.params.id;
    const appointment = AppointmentModel.getById(id);
    if (appointment) res.json(appointment);
    else res.status(404).json({ message: "Appointment not found" });
  },
  add: (req: Request, res: Response) => {
    const appointment = AppointmentModel.add(req.body);
    res.status(201).json(appointment);
  },
  update: (req: Request, res: Response) => {
    const id = req.params.id;
    const appointment = AppointmentModel.update(id, req.body);
    if (appointment) res.json(appointment);
    else res.status(404).json({ message: "Appointment not found" });
  },
  remove: (req: Request, res: Response) => {
    const id = req.params.id;
    const success = AppointmentModel.remove(id);
    if (success) res.json({ message: "Appointment removed" });
    else res.status(404).json({ message: "Appointment not found" });
  },
};
