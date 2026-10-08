import { NextResponse } from "next/server";
import { addInquiry } from "@/lib/store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, company, intent, message, jobSlug, jobTitle, type } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Full name, email, and message are required." },
        { status: 400 }
      );
    }

    const item = await addInquiry({
      type: type || (jobSlug ? "job_application" : "contact"),
      fullName: String(fullName).trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      company: company ? String(company).trim() : undefined,
      intent: intent ? String(intent).trim() : undefined,
      message: String(message).trim(),
      jobSlug: jobSlug ? String(jobSlug).trim() : undefined,
      jobTitle: jobTitle ? String(jobTitle).trim() : undefined,
    });

    return NextResponse.json({ success: true, inquiry: item });
  } catch (error) {
    console.error("[API Inquiries] Error:", error);
    return NextResponse.json(
      { error: "Internal server error submitting inquiry" },
      { status: 500 }
    );
  }
}
