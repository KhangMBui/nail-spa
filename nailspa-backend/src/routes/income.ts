import { Router } from "express";
import { IncomeController } from "../controllers/income";

const router = Router();

/**
 * @swagger
 * /api/incomes:
 *   get:
 *     summary: Get all incomes
 *     tags: [Incomes]
 *     responses:
 *       200:
 *         description: List of incomes
 */
router.get("/", IncomeController.getAll);

/**
 * @swagger
 * /api/incomes:
 *   post:
 *     summary: Create a new income record
 *     tags: [Incomes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date
 *               source:
 *                 type: string
 *               appointmentId:
 *                 type: integer
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Income created
 */
router.post("/", IncomeController.add);

export default router;
