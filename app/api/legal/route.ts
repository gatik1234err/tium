import { NextResponse } from "next/server";
import { getLegal } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const legal = await getLegal();
    return NextResponse.json(legal);
  } catch (error) {
    console.error("[API Legal] Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch legal settings" },
      { status: 500 }
    );
  }
}
