import { z } from "zod";

// Collection: User
export type Order = z.infer<typeof OrderSchema>;
export const OrderSchema = z.object({
  productId: z.string(),
  paymentMethod: z.enum(["credit", "debit"]),
});

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  address: z.string(),
  orders: z.array(OrderSchema),
  joinDate: z.date(),
});

// Collection: Product
export type Product = z.infer<typeof ProductSchema>;
export const ProductSchema = z.object({
  id: z.string(),
  brand: z.string(),
  name: z.string(),
  price: z.number(),
  category: z.enum(["tent", "sleeping bags", "clothes", "gear", "misc"]),
  description: z.string(),
});

// Collection: Alert
export type Alert = z.infer<typeof AlertSchema>;
export const AlertSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(1, { message: "The title of the alert must not be blank" }),
  type: z.enum(["warning", "info", "promotion"]),
  status: z.enum(["active", "inactive"]),
  createdAt: z.date(),
  modifiedAt: z.date(),
});

// Collection: Review
export type Review = z.infer<typeof ReviewSchema>;
export const ReviewSchema = z.object({});
