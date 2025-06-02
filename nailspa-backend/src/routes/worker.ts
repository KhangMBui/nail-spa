import { Router } from "express";
import { WorkerController } from "../controllers/worker";

const router = Router();

/**
 * @swagger
 * /api/workers:
 *   get:
 *     summary: Get all workers
 *     tags: [Workers]
 *     responses:
 *       200:
 *         description: List of workers
 */
router.get("/", WorkerController.getAll);

/**
 * @swagger
 * /api/workers/{id}:
 *   get:
 *     summary: Get a worker by ID
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Worker ID
 *     responses:
 *       200:
 *         description: Worker found
 *       404:
 *         description: Worker not found
 */
router.get("/:id", WorkerController.getById);

/**
 * @swagger
 * /api/workers:
 *   post:
 *     summary: Create a new worker
 *     tags: [Workers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               salary:
 *                 type: number
 *               passcode:
 *                 type: number
 *     responses:
 *       201:
 *         description: Worker created
 */
router.post("/", WorkerController.add);

/**
 * @swagger
 * /api/workers/checkin:
 *   post:
 *     summary: Worker check-in for arrival order
 *     tags: [Workers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               passcode:
 *                 type: number
 *     responses:
 *       200:
 *         description: Checked in
 *       400:
 *         description: Already checked in today
 *       401:
 *         description: Invalid credentials
 */
router.post("/checkin", WorkerController.checkin);

/**
 * @swagger
 * /api/workers/{id}:
 *   put:
 *     summary: Update a worker
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Worker ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               salary:
 *                 type: number
 *               passcode:
 *                 type: number
 *     responses:
 *       200:
 *         description: Worker updated
 *       404:
 *         description: Worker not found
 */
router.put("/:id", WorkerController.update);

/**
 * @swagger
 * /api/workers/{id}:
 *   delete:
 *     summary: Delete a worker
 *     tags: [Workers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Worker ID
 *     responses:
 *       200:
 *         description: Worker deleted
 *       404:
 *         description: Worker not found
 */
router.delete("/:id", WorkerController.remove);

export default router;
