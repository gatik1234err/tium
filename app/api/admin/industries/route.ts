import { NextResponse } from "next/server";
import { getIndustries, createIndustry, updateIndustry, deleteIndustry } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const industries = await getIndustries();
  return NextResponse.json(industries);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.overview) {
      return NextResponse.json({ error: "Name and Overview are required." }, { status: 400 });
    }

    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const id = body.id || slug;

    const newIndustry = await createIndustry({
      id,
      number: body.number || "01",
      name: body.name,
      slug,
      tagline: body.tagline || "",
      subtitle: body.subtitle || "",
      overview: body.overview,
      marketInsights: body.marketInsights || "",
      specializations: Array.isArray(body.specializations) ? body.specializations : [],
      keyRoles: Array.isArray(body.keyRoles) ? body.keyRoles : [],
      stats: Array.isArray(body.stats) ? body.stats : [],
      accentColor: body.accentColor || "from-blue-600/30 to-indigo-900/40",
    });

    return NextResponse.json({ success: true, industry: newIndustry });
  } catch (error) {
    console.error("[API Industries POST] Error:", error);
    return NextResponse.json({ error: "Failed to create industry" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Industry ID is required" }, { status: 400 });
    }

    const updated = await updateIndustry(body.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, industry: updated });
  } catch (error) {
    console.error("[API Industries PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update industry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Industry ID is required" }, { status: 400 });
    }

    const success = await deleteIndustry(id);
    if (!success) {
      return NextResponse.json({ error: "Industry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Industries DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete industry" }, { status: 500 });
  }
}
