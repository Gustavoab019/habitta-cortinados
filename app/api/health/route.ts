import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { formatErrorMessage } from "@/lib/utils";

export async function GET() {
  try {
    await connectToDatabase();
    const isConnected = mongoose.connection.readyState === 1;

    return NextResponse.json({
      ok: true,
      db: isConnected ? "connected" : "disconnected"
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        db: "disconnected",
        error: formatErrorMessage(error)
      },
      { status: 500 }
    );
  }
}
