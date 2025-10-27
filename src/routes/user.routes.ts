import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.put("/profile", userController.updateUser);
router.post("/change-password", userController.changePassword);

router.get("/", adminMiddleware, userController.getAllUsers);
router.get("/:id", adminMiddleware, userController.getUserById);
router.delete("/:id", adminMiddleware, userController.deleteUser);

export default router;
