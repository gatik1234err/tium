import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSettings();
  // Don't leak raw password in GET if avoidable, or return safe view
  return NextResponse.json({
    ...settings,
    admin: {
      username: settings.admin.username,
    },
  });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const currentSettings = await getSettings();
    const updated = {
      ...currentSettings,
      ...body,
      admin: {
        ...currentSettings.admin,
        ...(body.admin || {}),
      },
    };
    await saveSettings(updated);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("[API Settings PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
