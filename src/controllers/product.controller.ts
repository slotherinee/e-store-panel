import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator.js";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productService.getProductById(req.params.id!);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await productService.createProduct(data);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = updateProductSchema.parse(req.body);
    const product = await productService.updateProduct(req.params.id!, data);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await productService.deleteProduct(req.params.id!);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = (req.query.q as string) || "";
    const products = await productService.searchProducts(query);
    res.json(products);
  } catch (error) {
    next(error);
  }
};
