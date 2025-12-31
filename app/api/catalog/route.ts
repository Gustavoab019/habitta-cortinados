import { NextResponse } from "next/server";
import { formatErrorMessage } from "@/lib/utils";
import { getCatalog } from "@/services/catalogService";

export async function GET() {
  try {
    const catalog = await getCatalog();
    return NextResponse.json(catalog);
  } catch (error) {
    return NextResponse.json({ error: formatErrorMessage(error) }, { status: 500 });
  }
}
