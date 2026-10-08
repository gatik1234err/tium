import { NextResponse } from "next/server";
import { getServices, createService, updateService, deleteService } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = await getServices();
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Title and Description are required." }, { status: 400 });
    }

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const id = body.id || slug;

    const newService = await createService({
      id,
      number: body.number || "01",
      title: body.title,
      shortTitle: body.shortTitle || body.title,
      slug,
      tagline: body.tagline || "",
      description: body.description,
      fullOverview: body.fullOverview || body.description,
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
      capabilities: Array.isArray(body.capabilities) ? body.capabilities : [],
      process: Array.isArray(body.process) ? body.process : [],
      metrics: Array.isArray(body.metrics) ? body.metrics : [],
      roles: Array.isArray(body.roles) ? body.roles : [],
    });

    return NextResponse.json({ success: true, service: newService });
  } catch (error) {
    console.error("[API Services POST] Error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const updated = await updateService(body.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, service: updated });
  } catch (error) {
    console.error("[API Services PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }

    const success = await deleteService(id);
    if (!success) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Services DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
