import React from "react";
import type { Metadata } from "next";
import { getJobs, getPages } from "@/lib/store";
import { CareersClient } from "@/components/careers/CareersClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers & Open Positions | TIUM Staffing",
  description:
    "Explore high-impact positions across Information Technology, Healthcare, Automotive, Energy, and Aeronautics with TIUM Staffing.",
};

export default async function CareersPage() {
  const [jobs, pages] = await Promise.all([getJobs(), getPages()]);
  return <CareersClient initialJobs={jobs} pageContent={pages.careers} />;
}
