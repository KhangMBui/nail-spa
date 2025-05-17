import { Router } from "express";
import { ServiceController } from "../controllers/service";

const router = Router();

router.get("/", ServiceController.getAll);
router.get("/:id", ServiceController.getById);
router.post("/", ServiceController.add);
router.put("/:id", ServiceController.update);
router.delete("/:id", ServiceController.remove);

export default router;
