import { Request, Response } from "express";
import { Appointment } from "../models";

export const AppointmentController = {
  getAll: async (req: Request, res: Response) => {
    const Appointments = await Appointment.findAll();
    res.json(Appointments);
  },
  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const appointment = await Appointment.findByPk(id);
    if (Appointment) res.json(Appointment);
    else res.status(404).json({ message: "Appointment not found" });
  },
  add: async (req: Request, res: Response) => {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(Appointment);
  },
  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const [updated] = await Appointment.update(req.body, { where: { id } });
    if (updated) {
      const updatedAppointment = await Appointment.findByPk(id);
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  },
  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await Appointment.destroy({ where: { id } });
    if (deleted) res.json({ message: "Appointment removed" });
    else res.status(404).json({ message: "Appointment not found" });
  },
};
