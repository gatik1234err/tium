import { NextResponse } from "next/server";
import { getReasons, saveReasons } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const reasons = await getReasons();
  return NextResponse.json(reasons);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of reasons." }, { status: 400 });
    }
    await saveReasons(body);
    return NextResponse.json({ success: true, reasons: body });
  } catch (error) {
    console.error("[API Reasons PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update reasons" }, { status: 500 });
  }
}
