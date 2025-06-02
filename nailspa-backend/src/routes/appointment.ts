import { Router } from "express";
import { AppointmentController } from "../controllers/appointment";

const router = Router();

/**
 * @swagger
 * /api/appointments/initiate:
 *   post:
 *     summary: Initiate a draft appointment and suggest a worker
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               services:
 *                 type: array
 *                 items:
 *                   type: integer
 *               preferredWorker:
 *                 type: integer
 *                 nullable: true
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *               appointmentTime:
 *                 type: string
 *                 format: time
 *           example:
 *             name: "Hoang Bui"
 *             phone: "425 414 0885"
 *             serviceIds: [1, 3]
 *             preferredWorkerId: 0
 *             appointmentDate: "2025-06-02"
 *             appointmentTime: "14:30"
 *     responses:
 *       200:
 *         description: Draft appointment created
 *       400:
 *         description: Missing required fields or no available worker
 */
router.post("/initiate", AppointmentController.initiate);

/**
 * @swagger
 * /api/appointments/accept:
 *   post:
 *     summary: Accept and finalize an appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               workerId:
 *                 type: integer
 *               serviceIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               totalTurn:
 *                 type: number
 *           example:
 *             customerName: "Hoang Bui"
 *             customerPhone: "425 414 0885"
 *             date: "2025-06-02T14:30"
 *             workerId: 1
 *             serviceIds: [1, 3]
 *             totalTurn: 1.5
 *     responses:
 *       201:
 *         description: Appointment accepted and saved
 *       500:
 *         description: Failed to accept appointment
 */
router.post("/accept", AppointmentController.accept);

/**
 * @swagger
 * /api/appointments/{id}/close:
 *   post:
 *     summary: Mark an appointment as completed and set worker as available
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment closed and worker is now available
 *       404:
 *         description: Appointment not found
 */
router.post("/:id/close", AppointmentController.close);

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of appointments
 */
router.get("/", AppointmentController.getAll);

/**
 * @swagger
 * /api/appointments/{id}:
 *   get:
 *     summary: Get an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment found
 *       404:
 *         description: Appointment not found
 */
router.get("/:id", AppointmentController.getById);

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               serviceId:
 *                 type: integer
 *               workerId:
 *                 type: integer
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created
 */
router.post("/", AppointmentController.add);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               serviceId:
 *                 type: integer
 *               workerId:
 *                 type: integer
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated
 *       404:
 *         description: Appointment not found
 */
router.put("/:id", AppointmentController.update);

/**
 * @swagger
 * /api/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted
 *       404:
 *         description: Appointment not found
 */
router.delete("/:id", AppointmentController.remove);

export default router;
