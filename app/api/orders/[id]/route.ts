import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { env } from "@/lib/env";
import { formatErrorMessage } from "@/lib/utils";
import { orderUpdateSchema } from "@/schemas/order";
import { getOrderById, updateOrder } from "@/services/orderService";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const order = await getOrderById(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: formatErrorMessage(error) }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { id } = await params;

  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = orderUpdateSchema.parse(await request.json());
    const updated = await updateOrder(id, payload, env.MEASUREMENT_FEE);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    const status = error instanceof Error && error.name === "ZodError" ? 400 : 500;
    return NextResponse.json({ error: formatErrorMessage(error) }, { status });
  }
}
