import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { formatErrorMessage } from "@/lib/utils";
import { env } from "@/lib/env";
import { orderCreateSchema } from "@/schemas/order";
import { createOrder, listOrders } from "@/services/orderService";
import { sendOrderConfirmationEmail } from "@/services/emailService";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const payload = orderCreateSchema.parse(await request.json());
    const order = await createOrder(payload, env.MEASUREMENT_FEE);
    await sendOrderConfirmationEmail(order);
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    const status = error instanceof Error && error.name === "ZodError" ? 400 : 500;
    return NextResponse.json({ error: formatErrorMessage(error) }, { status });
  }
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await listOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: formatErrorMessage(error) }, { status: 500 });
  }
}
