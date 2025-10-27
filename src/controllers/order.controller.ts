import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/order.service.js";
import { AuthRequest } from "../middleware/auth.js";
import { z } from "zod";

const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"]),
});

export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const order = await orderService.createOrder(req.user.userId);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getUserOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const orders = await orderService.getUserOrders(req.user.userId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const order = await orderService.getOrderById(
      req.user.userId,
      req.params.id!
    );
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = updateOrderStatusSchema.parse(req.body);
    const order = await orderService.updateOrderStatus(req.params.id!, status);
    res.json(order);
  } catch (error) {
    next(error);
  }
};

export const cancelOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const result = await orderService.cancelOrder(
      req.user.userId,
      req.params.id!
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
