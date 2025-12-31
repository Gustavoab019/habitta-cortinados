import { Schema, Types, model, models, type HydratedDocument, type Model } from "mongoose";
import type { OrderStatus } from "../schemas/order";

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
}

export interface OrderAddress {
  line1: string;
  city: string;
  postalCode: string;
}

export interface OrderMeasurements {
  widthCm?: number;
  heightCm?: number;
}

export type OrderProductType = "curtain_wave" | "curtain_pleats" | "pillow" | "blind";

export interface OrderItem {
  productType: OrderProductType;
  fabricId: Types.ObjectId;
  railId: Types.ObjectId;
  measurements: OrderMeasurements;
  needsMeasurement: boolean;
}

export interface OrderPricing {
  currency: "EUR";
  subtotal: number;
  measurementFee: number;
  deposit: number;
  total: number;
  dueLater: number;
}

export interface Order {
  customer: OrderCustomer;
  address: OrderAddress;
  items: OrderItem[];
  pricing: OrderPricing;
  status: OrderStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderDocument = HydratedDocument<Order>;

const measurementSchema = new Schema<OrderMeasurements>(
  {
    widthCm: { type: Number },
    heightCm: { type: Number }
  },
  { _id: false }
);

const orderItemSchema = new Schema<OrderItem>(
  {
    productType: {
      type: String,
      enum: ["curtain_wave", "curtain_pleats", "pillow", "blind"],
      required: true
    },
    fabricId: { type: Schema.Types.ObjectId, ref: "Fabric", required: true },
    railId: { type: Schema.Types.ObjectId, ref: "Rail", required: true },
    measurements: { type: measurementSchema, default: {} },
    needsMeasurement: { type: Boolean, default: false }
  },
  { _id: false }
);

const pricingSchema = new Schema<OrderPricing>(
  {
    currency: { type: String, enum: ["EUR"], required: true },
    subtotal: { type: Number, required: true },
    measurementFee: { type: Number, required: true },
    deposit: { type: Number, required: true },
    total: { type: Number, required: true },
    dueLater: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new Schema<Order>(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true }
    },
    address: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    items: { type: [orderItemSchema], required: true },
    pricing: { type: pricingSchema, required: true },
    status: {
      type: String,
      enum: [
        "NEW",
        "AWAITING_QUOTE",
        "AWAITING_MEASUREMENT",
        "MEASURED",
        "AWAITING_APPROVAL",
        "IN_PRODUCTION",
        "READY",
        "DELIVERED",
        "CANCELLED"
      ],
      default: "NEW"
    },
    notes: { type: String }
  },
  { timestamps: true }
);

if (models.Order) {
  delete models.Order;
}

export const OrderModel: Model<Order> = model<Order>("Order", orderSchema);
