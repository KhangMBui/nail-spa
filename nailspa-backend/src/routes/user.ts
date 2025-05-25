import { Router } from "express";
import { UserController } from "../controllers/user";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", UserController.add);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.remove);

export default router;
