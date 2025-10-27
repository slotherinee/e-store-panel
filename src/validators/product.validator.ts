import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().nonnegative("Stock must be non-negative").default(0),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .optional(),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive").optional(),
  stock: z.number().int().nonnegative("Stock must be non-negative").optional(),
  imageUrl: z.string().url("Invalid image URL").optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
