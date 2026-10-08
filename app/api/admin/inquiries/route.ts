import { NextResponse } from "next/server";
import { getInquiries, updateInquiry, deleteInquiry } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const inquiries = await getInquiries();
  return NextResponse.json(inquiries);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    const updated = await updateInquiry(body.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error("[API Inquiries PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required." }, { status: 400 });
    }

    const success = await deleteJobInquiry(id);
    if (!success) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Inquiries DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}

async function deleteJobInquiry(id: string) {
  return deleteInquiry(id);
}
