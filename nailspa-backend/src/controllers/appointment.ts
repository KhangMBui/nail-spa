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
    /* TODO: calculate total price of all services, and add to income table */
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

      // Create the appointment with status "initialized"
      const appointment = await Appointment.create({
        customerName: name,
        customerPhone: phone,
        date: `${appointmentDate}T${appointmentTime}`,
        workerId: assignedWorker.getDataValue("id"),
        status: "initialized",
        totalTurn,
      });

      // Create AppointmentService entries
      await Promise.all(
        serviceIds.map((serviceId: number) =>
          AppointmentService.create({
            appointmentId: appointment.getDataValue("id"),
            serviceId,
          })
        )
      );

      res.status(201).json({
        message: "Appointment initialized. Please accept to finalize.",
        appointmentId: appointment.getDataValue("id"),
        assignedWorker: {
          id: assignedWorker.getDataValue("id"),
          name: assignedWorker.getDataValue("name"),
        },
        serviceIds: serviceIds,
      });
    } catch (err) {
      res.status(500).json({ error: `Failed to initiate appointment: ${err}` });
    }
  }) as RequestHandler,
  accept: (async (req: Request, res: Response) => {
    try {
      const { appointmentId } = req.body;
      if (!appointmentId) {
        return res.status(400).json({ error: "Missing appointmentId" });
      }

      // 1. Find the initialized appointment
      const appointment = await Appointment.findByPk(appointmentId);
      if (!appointment) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      if (appointment.getDataValue("status") !== "initialized") {
        return res.status(404).json({
          error: "Appointment is not initialized or might have been completed.",
        });
      }

      // 2. Get all services for this appointment
      const appointmentServices = await AppointmentService.findAll({
        where: { appointmentId },
      });
      const serviceIds = appointmentServices.map((as) =>
        as.getDataValue("serviceId")
      );

      // 3. Calculate totalTurn
      const selectedServices = await Service.findAll({
        where: { id: serviceIds },
      });
      const totalTurn = selectedServices.reduce(
        (sum, s) => sum + s.getDataValue("turn"),
        0
      );

      // 4. Update worker's turn and availability
      const workerId = appointment.getDataValue("workerId");
      const worker = await Worker.findByPk(workerId);
      const currentTurn = worker ? worker.getDataValue("turn") || 0 : 0;

      await Worker.update(
        {
          turn: totalTurn !== undefined ? currentTurn + totalTurn : currentTurn,
          isAvailable: false,
        },
        { where: { id: workerId } }
      );

      // 5. Update appointment status
      await appointment.update({ status: "scheduled" });

      res.status(201).json({
        message: "Appointment accepted and scheduled.",
        appointmentId,
      });
    } catch (err) {
      res.status(500).json({ error: `Failed to accept appointment: ${err}` });
    }
  }) as RequestHandler,
  close: (async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      let { tip } = req.body;

      if (!tip) {
        tip = 0;
      }

      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found." });
      }

      if (appointment.getDataValue("status") !== "completed") {
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

        res.json({
          message: "Appointment closed and worker is now available.",
          tip: tip,
        });
        return;
      }

      res.json({
        message:
          "This appointment has already been closed before this request.",
      });
      return;
    } catch (error) {
      console.error("Error closing appointment:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
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
