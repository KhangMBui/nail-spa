import { Router } from "express";
import { AppointmentController } from "../controllers/appointment";

const router = Router();

router.get("/", AppointmentController.getAll);
router.get("/:id", AppointmentController.getById);
router.post("/", AppointmentController.add);
router.put("/:id", AppointmentController.update);
router.delete("/:id", AppointmentController.remove);

export default router;
