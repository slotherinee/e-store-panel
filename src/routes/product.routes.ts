import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/search", productController.searchProducts);
router.get("/:id", productController.getProductById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  productController.createProduct
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct
);

export default router;
