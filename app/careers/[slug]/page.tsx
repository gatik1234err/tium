import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getJobs, getJobBySlug } from "@/lib/store";
import {
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return { title: "Job Not Found | TIUM Staffing" };
  }

  return {
    title: `${job.title} | Careers at TIUM`,
    description: job.description.slice(0, 160),
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const allJobs = await getJobs();
  const relatedJobs = allJobs
    .filter((j) => j.id !== job.id && (j.industry === job.industry || j.type === job.type))
    .slice(0, 2);

  return (
    <div className="pt-16 bg-white">
      {/* ── Breadcrumb / Back Bar ── */}
      <div className="border-b border-slate-100 bg-slate-50 py-3.5">
        <Container>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Positions
          </Link>
        </Container>
      </div>

      {/* ── Hero / Header ── */}
      <section className="py-16 border-b border-slate-100 bg-slate-50/60">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold tracking-wider uppercase font-mono px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {job.industry}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-200">
                {job.type}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-200">
                {job.experience}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 font-display leading-[1.08]">
              {job.title}
            </h1>

            {/* Quick Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 pt-2 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-900 font-mono">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Posted {job.postedDate}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                href={`/contact?intent=career&job=${encodeURIComponent(job.title)}`}
                variant="primary"
                size="lg"
                withArrow
              >
                Apply for this Position
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Ask a Question
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Main Content & Details ── */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Job Details */}
            <div className="lg:col-span-8 space-y-12">
              {/* Role Overview */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-display">Role Overview</h2>
                <p className="text-slate-600 leading-relaxed text-base">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 font-display">
                    Key Responsibilities
                  </h2>
                  <div className="space-y-3">
                    {job.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 font-display">
                    Required Qualifications
                  </h2>
                  <div className="space-y-3">
                    {job.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                        <span className="leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 font-display">
                    Compensation & Benefits
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {job.benefits.map((b, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-center gap-2.5 font-medium"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Apply CTA Block */}
              <div className="p-8 rounded-2xl soothing-blue-mesh text-white space-y-4 border border-blue-900/60 shadow-lg">
                <h3 className="text-2xl font-bold font-display">Ready to submit your application?</h3>
                <p className="text-blue-100/80 text-sm max-w-xl leading-relaxed">
                  Our Austin talent advisory team reviews every profile carefully and responds within one business day with interview logistics and scope details.
                </p>
                <div className="pt-2">
                  <Button
                    href={`/contact?intent=career&job=${encodeURIComponent(job.title)}`}
                    variant="primary"
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-slate-100"
                    withArrow
                  >
                    Submit Application
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
              {/* Role Snapshot Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Role Summary
                </h3>
                <div className="divide-y divide-slate-100 text-xs space-y-3 pt-1">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Industry</span>
                    <span className="font-semibold text-slate-900">{job.industry}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Employment Type</span>
                    <span className="font-semibold text-slate-900">{job.type}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Seniority</span>
                    <span className="font-semibold text-slate-900">{job.experience}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Target Comp</span>
                    <span className="font-semibold text-slate-900 font-mono">{job.salary}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-500">Location</span>
                    <span className="font-semibold text-slate-900">{job.location}</span>
                  </div>
                </div>
              </div>

              {/* Related Roles */}
              {relatedJobs.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-mono">
                    Related Openings
                  </h3>
                  <div className="space-y-3">
                    {relatedJobs.map((rj) => (
                      <Link
                        key={rj.id}
                        href={`/careers/${rj.slug}`}
                        className="block p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all group"
                      >
                        <span className="text-[10px] font-mono uppercase text-blue-600 font-bold">
                          {rj.industry}
                        </span>
                        <h4 className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                          {rj.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                          <span>{rj.location}</span>
                          <span className="font-mono text-slate-700 font-medium">{rj.salary}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
