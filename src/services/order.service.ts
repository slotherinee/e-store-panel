import prisma from "../config/database.js";
import { AppError } from "../middleware/errorHandler.js";
import { Prisma } from "@prisma/client";

export const createOrder = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new AppError(400, "Cart is empty");
  }

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new AppError(400, `Insufficient stock for ${item.product.name}`);
    }
  }

  const total = cart.items.reduce((sum: number, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const order = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      for (const item of cart.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    }
  );

  return order;
};

export const getUserOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const getOrderById = async (userId: string, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  if (order.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  return order;
};

export const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const updateOrderStatus = async (
  orderId: string,
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED"
) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
};

export const cancelOrder = async (userId: string, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
  });

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  if (order.userId !== userId) {
    throw new AppError(403, "Forbidden");
  }

  if (order.status === "COMPLETED") {
    throw new AppError(400, "Cannot cancel completed order");
  }

  if (order.status === "CANCELLED") {
    throw new AppError(400, "Order is already cancelled");
  }

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    await tx.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });

    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
    }
  });

  return { message: "Order cancelled successfully" };
};
