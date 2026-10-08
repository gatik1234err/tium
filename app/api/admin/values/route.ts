import { NextResponse } from "next/server";
import { getValues, saveValues } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const values = await getValues();
  return NextResponse.json(values);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array of values." }, { status: 400 });
    }
    await saveValues(body);
    return NextResponse.json({ success: true, values: body });
  } catch (error) {
    console.error("[API Values PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update values" }, { status: 500 });
  }
}
