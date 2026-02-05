import { z } from "zod";

// --------------- Collection: Address ---------------
const AddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  line1: z.string(),
  line2: z.string().nullable(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

// --------------- Collection: User ---------------
export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  addressIds: z.array(z.string()), // Option to save address only at checkout
  joinDate: z.date(),
  role: z.enum(["customer", "user"]),
});

// --------------- Collection: Order ---------------

const paymentStatus = z.enum(["unpaid", "pending", "paid", "refunded"]);
export type PaymentStatus = z.infer<typeof paymentStatus>;
const orderStatus = z.enum(["processing", "shipped", "delivered", "cancelled"]);
export type OrderStatus = z.infer<typeof orderStatus>;

/** Take a snapshot of products at purchase time to caption details of price and/or name changes */
const ProductSnapshotSchema = z.object({
  productId: z.string(),
  nameSnapshot: z.string(),
  priceSnapshot: z.number(),
  quantity: z.number(),
});
export type ProductSnapshot = z.infer<typeof ProductSnapshotSchema>;

export type Order = z.infer<typeof OrderSchema>;
export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(ProductSnapshotSchema),
  paymentStatus,
  orderStatus,
  paymentMethodType: z.string().nullable(),
  shippingAddress: AddressSchema,
  createdAt: z.date(),

  // Aggregates
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
});

// --------------- Collection: Product ---------------

const Image = z.object({
  url: z.string(),
  alt: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
export const ProductSchema = z.object({
  id: z.string(),
  brandId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number(),
  categoryIds: z.array(z.string()),
  images: z.array(Image),
  stock: z.number(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),

  // Aggregates
  ratingAverage: z.number(),
  ratingCount: z.number(),
});

// --------------- Collection: Category ---------------
export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  image: Image,
});
export type Category = z.infer<typeof CategorySchema>;

// --------------- Collection: Brand ---------------
export type Brand = z.infer<typeof BrandSchema>;
export const BrandSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo: Image,
});

// --------------- Collection: Alert ---------------
export type Alert = z.infer<typeof AlertSchema>;
export const AlertSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["warning", "info", "promotion"]),
  scope: z.enum(["brand", "category", "product"]),
  targetIds: z.array(z.string()),
  status: z.enum(["active", "inactive"]),
  startsAt: z.date(),
  endsAt: z.date().nullable(),
});

// --------------- Collection: Review ---------------
export type Review = z.infer<typeof ReviewSchema>;
export const ReviewSchema = z.object({
  id: z.string(),
  productId: z.string(),
  userId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string(),
  comment: z.string(),
  createdAt: z.date(),
  modifiedAt: z.date(),

  // Aggregate
  isVerifiedPurchase: z.boolean(),
});
