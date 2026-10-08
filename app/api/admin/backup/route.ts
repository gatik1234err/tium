import { NextResponse } from "next/server";
import { exportAllData, importAllData } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await exportAllData();
    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="tium-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch (error) {
    console.error("[API Backup GET] Error:", error);
    return NextResponse.json({ error: "Failed to export site data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await importAllData(data);
    return NextResponse.json({ success: true, message: "Site data imported and updated successfully" });
  } catch (error) {
    console.error("[API Backup POST] Error:", error);
    return NextResponse.json({ error: "Failed to restore site data" }, { status: 500 });
  }
}
