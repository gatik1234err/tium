import { NextResponse } from "next/server";
import { getPages, savePages } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = await getPages();
  return NextResponse.json(pages);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await savePages(body);
    return NextResponse.json({ success: true, pages: body });
  } catch (error) {
    console.error("[API Pages PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update page contents" }, { status: 500 });
  }
}
