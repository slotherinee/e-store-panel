import { Router } from "express";
import * as orderController from "../controllers/order.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.post("/", orderController.createOrder);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);
router.post("/:id/cancel", orderController.cancelOrder);

router.get("/admin/all", adminMiddleware, orderController.getAllOrders);
router.put("/:id/status", adminMiddleware, orderController.updateOrderStatus);

export default router;
