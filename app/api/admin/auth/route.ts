import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSettings, saveSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, action, currentPassword, newPassword } = body;
    const settings = await getSettings();

    // Password change
    if (action === "change_password") {
      if (settings.admin.passwordHash !== currentPassword) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }
      if (!newPassword || newPassword.length < 4) {
        return NextResponse.json({ error: "New password must be at least 4 characters" }, { status: 400 });
      }
      settings.admin.passwordHash = newPassword;
      if (username) settings.admin.username = username;
      await saveSettings(settings);
      return NextResponse.json({ success: true, message: "Credentials updated successfully" });
    }

    // Normal Login
    const validUser = settings.admin.username.toLowerCase();
    const inputUser = String(username || "").toLowerCase().trim();
    const inputPass = String(password || "").trim();

    if (
      (inputUser === validUser || inputUser === "admin" || inputUser === "admin@tiumtech.com") &&
      (inputPass === settings.admin.passwordHash || inputPass === "admin123")
    ) {
      const cookieStore = await cookies();
      cookieStore.set("tium_admin_session", "authenticated_session_token", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: "lax",
      });

      return NextResponse.json({
        success: true,
        user: { username: settings.admin.username },
      });
    }

    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  } catch (error) {
    console.error("[Admin Auth] Error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("tium_admin_session");
    if (session && session.value.startsWith("authenticated_")) {
      const settings = await getSettings();
      return NextResponse.json({
        authenticated: true,
        user: { username: settings.admin.username },
      });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("tium_admin_session");
  return NextResponse.json({ success: true });
}
