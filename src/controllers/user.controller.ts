import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service.js";
import {
  updateUserSchema,
  changePasswordSchema,
} from "../validators/user.validator.js";
import { AuthRequest } from "../middleware/auth.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.params.id!);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const data = updateUserSchema.parse(req.body);
    const user = await userService.updateUser(req.user.userId, data);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const data = changePasswordSchema.parse(req.body);
    const result = await userService.changePassword(req.user.userId, data);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userService.deleteUser(req.params.id!);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
