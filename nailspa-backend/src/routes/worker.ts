import { Router } from "express";
import { WorkerController } from "../controllers/worker";

const router = Router();

router.get("/", WorkerController.getAll);
router.get("/:id", WorkerController.getById);
router.post("/", WorkerController.add);
router.put("/:id", WorkerController.update);
router.delete("/:id", WorkerController.remove);

export default router;
