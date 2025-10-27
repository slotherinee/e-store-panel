import prisma from "../config/database.js";
import { AppError } from "../middleware/errorHandler.js";
import {
  AddToCartInput,
  UpdateCartItemInput,
} from "../validators/cart.validator.js";

export const getCart = async (userId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return cart;
};

export const addToCart = async (userId: string, data: AddToCartInput) => {
  const cart = await getCart(userId);

  const product = await prisma.product.findUnique({
    where: { id: data.productId },
  });

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  if (product.stock < data.quantity) {
    throw new AppError(400, "Insufficient stock");
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: data.productId,
      },
    },
  });

  if (existingItem) {
    const newQuantity = existingItem.quantity + data.quantity;

    if (product.stock < newQuantity) {
      throw new AppError(400, "Insufficient stock");
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: newQuantity },
      include: {
        product: true,
      },
    });

    return updatedItem;
  } else {
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: data.productId,
        quantity: data.quantity,
      },
      include: {
        product: true,
      },
    });

    return cartItem;
  }
};

export const updateCartItem = async (
  userId: string,
  cartItemId: string,
  data: UpdateCartItemInput
) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    include: {
      cart: true,
      product: true,
    },
  });

  if (!cartItem) {
    throw new AppError(404, "Cart item not found");
  }

  if (cartItem.cart.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  if (cartItem.product.stock < data.quantity) {
    throw new AppError(400, "Insufficient stock");
  }

  const updatedItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: data.quantity },
    include: {
      product: true,
    },
  });

  return updatedItem;
};

export const removeFromCart = async (userId: string, cartItemId: string) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    include: {
      cart: true,
    },
  });

  if (!cartItem) {
    throw new AppError(404, "Cart item not found");
  }

  if (cartItem.cart.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });

  return { message: "Item removed from cart" };
};

export const clearCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    throw new AppError(404, "Cart not found");
  }

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return { message: "Cart cleared" };
};
