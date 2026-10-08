import { NextResponse } from "next/server";
import { getLegal, saveLegal } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const legal = await getLegal();
  return NextResponse.json(legal);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const currentLegal = await getLegal();
    const updated = {
      cookies: { ...currentLegal.cookies, ...(body.cookies || {}) },
      terms: { ...currentLegal.terms, ...(body.terms || {}) },
      privacy: { ...currentLegal.privacy, ...(body.privacy || {}) },
    };
    await saveLegal(updated);
    return NextResponse.json({ success: true, legal: updated });
  } catch (error) {
    console.error("[API Legal PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update legal settings" }, { status: 500 });
  }
}
