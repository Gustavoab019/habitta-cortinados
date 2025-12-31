import { Types } from "mongoose";
import { connectToDatabase } from "../lib/db";
import { OrderModel } from "../models/Order";
import type { Order, OrderItem } from "../models/Order";
import type { OrderCreateInput, OrderDto, OrderItemInput, OrderUpdateInput, Pricing } from "../schemas/order";

function toObjectId(id: string | Types.ObjectId): Types.ObjectId {
  return typeof id === "string" ? new Types.ObjectId(id) : id;
}

function calculatePricing(items: OrderItem[], measurementFeeValue: number): Pricing {
  const measurementCount = items.filter((item) => item.needsMeasurement).length;
  const measurementFee = measurementCount > 0 ? measurementCount * measurementFeeValue : 0;
  const subtotal = 0; // placeholder until pricing logic is available
  const deposit = measurementFee > 0 ? measurementFee : 0;
  const total = measurementFee > 0 ? deposit : subtotal;
  const dueLater = measurementFee > 0 ? 0 : Math.max(total - deposit, 0);

  return {
    currency: "EUR",
    subtotal,
    measurementFee,
    deposit,
    total,
    dueLater
  };
}

function mapOrderItems(items: OrderItemInput[]): OrderItem[] {
  return items.map((item) => ({
    productType: item.productType,
    fabricId: toObjectId(item.fabricId),
    railId: toObjectId(item.railId),
    measurements: item.measurements ?? {},
    needsMeasurement: item.needsMeasurement
  }));
}

function mapOrderDocument(order: Order & { _id: Types.ObjectId }): OrderDto {
  return {
    id: order._id.toString(),
    customer: order.customer,
    address: order.address,
    items: order.items.map((item) => ({
      productType: item.productType,
      fabricId: item.fabricId.toString(),
      railId: item.railId.toString(),
      measurements: item.measurements,
      needsMeasurement: item.needsMeasurement
    })),
    pricing: order.pricing,
    status: order.status,
    notes: order.notes,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString()
  };
}

export async function createOrder(payload: OrderCreateInput, measurementFeeValue: number): Promise<OrderDto> {
  await connectToDatabase();

  const items = mapOrderItems(payload.items);
  const pricing = calculatePricing(items, measurementFeeValue);
  const status = "AWAITING_QUOTE";

  const order = await OrderModel.create({
    customer: payload.customer,
    address: payload.address,
    items,
    pricing,
    status,
    notes: payload.notes
  });

  return mapOrderDocument(order.toObject({ depopulate: true }) as Order & { _id: Types.ObjectId });
}

export async function listOrders(): Promise<OrderDto[]> {
  await connectToDatabase();
  const orders = await OrderModel.find().sort({ createdAt: -1 }).lean<Order & { _id: Types.ObjectId }>();
  return orders.map(mapOrderDocument);
}

export async function getOrderById(id: string): Promise<OrderDto | null> {
  await connectToDatabase();
  const order = await OrderModel.findById(id).lean<Order & { _id: Types.ObjectId }>();
  return order ? mapOrderDocument(order) : null;
}

export async function updateOrder(
  id: string,
  payload: OrderUpdateInput,
  measurementFeeValue: number
): Promise<OrderDto | null> {
  await connectToDatabase();

  const order = await OrderModel.findById(id);
  if (!order) {
    return null;
  }

  if (payload.items) {
    if (payload.items.length !== order.items.length) {
      throw new Error("Item count mismatch. Provide updates for all items.");
    }

    const mergedItems = payload.items.map((item, index) => {
      const existing = order.items[index];
      return {
        productType: item.productType ?? existing.productType,
        fabricId: item.fabricId ? toObjectId(item.fabricId) : existing.fabricId,
        railId: item.railId ? toObjectId(item.railId) : existing.railId,
        measurements: item.measurements ?? existing.measurements,
        needsMeasurement: item.needsMeasurement ?? existing.needsMeasurement
      };
    });

    order.items = mergedItems;
  }

  if (payload.status) {
    order.status = payload.status;
  }

  if (payload.notes !== undefined) {
    order.notes = payload.notes;
  }

  order.pricing = calculatePricing(order.items, measurementFeeValue);

  await order.save();
  return mapOrderDocument(order.toObject({ depopulate: true }) as Order & { _id: Types.ObjectId });
}
