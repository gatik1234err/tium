import { NextResponse } from "next/server";
import { getJobs, createJob, updateJob, deleteJob } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const jobs = await getJobs();
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.industry) {
      return NextResponse.json({ error: "Title and Industry are required." }, { status: 400 });
    }

    // Auto-generate slug if not provided
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newJob = await createJob({
      ...body,
      slug,
      postedDate: body.postedDate || "Just now",
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [],
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      benefits: Array.isArray(body.benefits) ? body.benefits : [],
    });

    return NextResponse.json({ success: true, job: newJob });
  } catch (error) {
    console.error("[API Jobs POST] Error:", error);
    return NextResponse.json({ error: "Failed to create job listing" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "Job ID is required for updating." }, { status: 400 });
    }

    const updated = await updateJob(body.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, job: updated });
  } catch (error) {
    console.error("[API Jobs PUT] Error:", error);
    return NextResponse.json({ error: "Failed to update job listing" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Job ID is required for deletion." }, { status: 400 });
    }

    const success = await deleteJob(id);
    if (!success) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API Jobs DELETE] Error:", error);
    return NextResponse.json({ error: "Failed to delete job listing" }, { status: 500 });
  }
}
