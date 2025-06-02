import { Request, RequestHandler, Response } from "express";
import {
  Appointment,
  AppointmentService,
  Service,
  WorkerArrival,
} from "../models";
import { Worker } from "../models";
import { assignWorkerForOrder } from "../services/workerAssignmentService";

export const AppointmentController = {
  initiate: (async (req: Request, res: Response) => {
    try {
      const {
        name,
        phone,
        serviceIds,
        preferredWorkerId,
        appointmentDate,
        appointmentTime,
      } = req.body;

      if (
        !name ||
        !phone ||
        !serviceIds ||
        !Array.isArray(serviceIds) ||
        serviceIds.length === 0 ||
        !appointmentDate ||
        !appointmentTime
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      let assignedWorker = null;
      let totalTurn = 0;

      if (preferredWorkerId) {
        const isWorkerCheckedIn = await WorkerArrival.findOne({
          where: { workerId: preferredWorkerId },
        });

        if (!isWorkerCheckedIn) {
          return res.status(404).json({
            error: "Preferred worker not found. Perhaps not checked in yet.",
          });
        }

        assignedWorker = await Worker.findByPk(preferredWorkerId);

        if (!assignedWorker) {
          return res.status(404).json({
            error: "Preferred worker not found.",
          });
        }

        // Calculate turn:
        const selectedServices = await Service.findAll({
          where: { id: serviceIds },
        });
        totalTurn = selectedServices.reduce(
          (sum, s) => sum + s.getDataValue("turn"),
          0
        );
      } else {
        const result = await assignWorkerForOrder(serviceIds);
        assignedWorker = result.chosenWorker;
        totalTurn = result.totalTurn;
        if (!assignedWorker) {
          return res.status(400).json({ error: "No available worker found" });
        }
      }

      // Prepare draft appointment (not saved yet)
      const draftAppointment = {
        customerName: name,
        customerPhone: phone,
        date: `${appointmentDate}T${appointmentTime}`,
        workerId: assignedWorker.getDataValue("id"),
        serviceIds,
        totalTurn,
      };
      res.json({
        message: "Draft appointment created. Please confirm to finalize.",
        appointment: draftAppointment,
        assignedWorker: {
          id: assignedWorker.getDataValue("id"),
          name: assignedWorker.getDataValue("name"),
        },
      });
    } catch (err) {
      res.status(500).json({ error: `Failed to initiate appointment: ${err}` });
    }
  }) as RequestHandler,
  accept: async (req: Request, res: Response) => {
    try {
      const {
        customerName,
        customerPhone,
        date,
        workerId,
        serviceIds,
        totalTurn,
      } = req.body;

      // 1. Create the appointment
      const appointment = await Appointment.create({
        customerName,
        customerPhone,
        date,
        workerId,
        status: "scheduled",
      });

      // 2. Create AppointmentService entries
      if (Array.isArray(serviceIds)) {
        await Promise.all(
          serviceIds.map((serviceId: number) =>
            AppointmentService.create({
              appointmentId: appointment.getDataValue("id"),
              serviceId,
            })
          )
        );
      }

      // 3. Update worker's turn and availability
      const worker = await Worker.findByPk(workerId);
      const currentTurn = worker ? worker.getDataValue("turn") || 0 : 0;

      await Worker.update(
        {
          turn: totalTurn !== undefined ? currentTurn + totalTurn : currentTurn,
          isAvailable: false,
        },
        { where: { id: workerId } }
      );
      res.status(201).json({
        message: "Appointment accepted and saved.",
        appointmentId: appointment.getDataValue("id"),
      });
    } catch (err) {
      res.status(500).json({ error: `Failed to accept appointment: ${err}` });
    }
  },
  close: (async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    // Mark appointment as completed
    await appointment.update({
      status: "completed",
    });

    // Set Worker as available
    await Worker.update(
      {
        isAvailable: true,
      },
      { where: { id: appointment.getDataValue("workerId") } }
    );

    res.json({ message: "Appointment closed and worker is now available." });
  }) as RequestHandler,
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
