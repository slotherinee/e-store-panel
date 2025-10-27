import prisma from "../config/database.js";
import { AppError } from "../middleware/errorHandler.js";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../validators/product.validator.js";

export const getAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

export const getProductById = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return product;
};

export const createProduct = async (data: CreateProductInput) => {
  const createData: any = {
    name: data.name,
    price: data.price,
    stock: data.stock,
  };
  if (data.description !== undefined) createData.description = data.description;
  if (data.imageUrl !== undefined) createData.imageUrl = data.imageUrl;

  const product = await prisma.product.create({
    data: createData,
  });

  return product;
};

export const updateProduct = async (
  productId: string,
  data: UpdateProductInput
) => {
  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.stock !== undefined) updateData.stock = data.stock;
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;

  const product = await prisma.product.update({
    where: { id: productId },
    data: updateData,
  });

  return product;
};

export const deleteProduct = async (productId: string) => {
  await prisma.product.delete({
    where: { id: productId },
  });

  return { message: "Product deleted successfully" };
};

export const searchProducts = async (query: string) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};
