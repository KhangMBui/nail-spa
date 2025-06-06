import { Router } from "express";
import { AppointmentController } from "../controllers/appointment";

const router = Router();

/**
 * @swagger
 * /api/appointments/initiate:
 *   post:
 *     summary: Initiate an appointment with status as initialized
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
 *         description: Appointment initialized. Please accept to finalize.
 *       400:
 *         description: Missing required fields or no available worker
 */
router.post("/initiate", AppointmentController.initiate);

/**
 * @swagger
 * /api/appointments/accept:
 *   post:
 *     summary: Accept and finalize an appointment with status as scheduled
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               appointmentId:
 *                 type: integer
 *           example:
 *             appointmentId: 1
 *     responses:
 *       201:
 *         description: Appointment accepted and scheduled.
 *       400:
 *         description: Missing appointmentId
 *       404:
 *         description: Appointment not found
 */
router.post("/accept", AppointmentController.accept);

/**
 * @swagger
 * /api/appointments/{id}/close:
 *   post:
 *     summary: Mark an appointment as completed and set worker as available
 *     tags: [Appointments]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tip:
 *                 type: float
 *               notes:
 *                 type: string
 *           example:
 *             tip: 5
 *             notes: ""
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
