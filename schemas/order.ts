import { Types } from "mongoose";
import { z } from "zod";

export const objectIdSchema = z.string().refine((value) => Types.ObjectId.isValid(value), {
  message: "Invalid ObjectId"
});

export const orderStatusSchema = z.enum([
  "NEW",
  "AWAITING_MEASUREMENT",
  "AWAITING_QUOTE",
  "MEASURED",
  "AWAITING_APPROVAL",
  "IN_PRODUCTION",
  "READY",
  "DELIVERED",
  "CANCELLED"
]);

export const productTypeSchema = z.enum(["curtain_wave", "curtain_pleats", "pillow", "blind"]);

export const measurementSchema = z
  .object({
    widthCm: z.number().positive().optional(),
    heightCm: z.number().positive().optional()
  })
  .refine(
    (value) => value.widthCm !== undefined || value.heightCm !== undefined || Object.keys(value).length === 0,
    { message: "Provide at least one measurement value or leave the object empty." }
  );

export const orderItemSchema = z.object({
  productType: productTypeSchema,
  fabricId: objectIdSchema,
  railId: objectIdSchema,
  measurements: measurementSchema.default({}),
  needsMeasurement: z.boolean()
});

export const orderItemUpdateSchema = orderItemSchema.partial({
  measurements: true,
  fabricId: true,
  railId: true
});

export const customerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(3)
});

export const addressSchema = z.object({
  line1: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(2)
});

export const pricingSchema = z.object({
  currency: z.literal("EUR"),
  subtotal: z.number(),
  measurementFee: z.number(),
  deposit: z.number(),
  total: z.number(),
  dueLater: z.number()
});

export const orderCreateSchema = z.object({
  customer: customerSchema,
  address: addressSchema,
  items: z.array(orderItemSchema).min(1),
  notes: z.string().optional()
});

export const orderUpdateSchema = z.object({
  status: orderStatusSchema.optional(),
  items: z.array(orderItemUpdateSchema).optional(),
  notes: z.string().optional()
});

export const orderDtoSchema = z.object({
  id: objectIdSchema,
  customer: customerSchema,
  address: addressSchema,
  items: z.array(
    z.object({
      productType: productTypeSchema,
      fabricId: objectIdSchema,
      railId: objectIdSchema,
      measurements: measurementSchema,
      needsMeasurement: z.boolean()
    })
  ),
  pricing: pricingSchema,
  status: orderStatusSchema,
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
export type OrderUpdateInput = z.infer<typeof orderUpdateSchema>;
export type Pricing = z.infer<typeof pricingSchema>;
export type OrderDto = z.infer<typeof orderDtoSchema>;
