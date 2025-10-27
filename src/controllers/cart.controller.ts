import { Request, Response, NextFunction } from "express";
import * as cartService from "../services/cart.service.js";
import {
  addToCartSchema,
  updateCartItemSchema,
} from "../validators/cart.validator.js";
import { AuthRequest } from "../middleware/auth.js";

export const getCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const cart = await cartService.getCart(req.user.userId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const data = addToCartSchema.parse(req.body);
    const cartItem = await cartService.addToCart(req.user.userId, data);
    res.status(201).json(cartItem);
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const data = updateCartItemSchema.parse(req.body);
    const cartItem = await cartService.updateCartItem(
      req.user.userId,
      req.params.itemId!,
      data
    );
    res.json(cartItem);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const result = await cartService.removeFromCart(
      req.user.userId,
      req.params.itemId!
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const clearCart = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const result = await cartService.clearCart(req.user.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
