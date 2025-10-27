import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { AuthRequest } from "../middleware/auth.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await authService.register(data);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const user = await authService.getProfile(req.user.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
