import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.get("/", cartController.getCart);
router.post("/items", cartController.addToCart);
router.put("/items/:itemId", cartController.updateCartItem);
router.delete("/items/:itemId", cartController.removeFromCart);
router.delete("/", cartController.clearCart);

export default router;
