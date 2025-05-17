import { Router } from "express";
import { IncomeController } from "../controllers/income";

const router = Router();

router.get("/", IncomeController.getAll);
router.post("/", IncomeController.add);

export default router;
