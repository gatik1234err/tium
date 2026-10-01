import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { jobs } from "@/data/jobs";
import {
  MapPin,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((j) => j.slug === slug);

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
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = jobs
    .filter((j) => j.id !== job.id && (j.industry === job.industry || j.type === job.type))
    .slice(0, 2);

  return (
    <div className="pt-16 bg-white">
      {/* ── Breadcrumb / Back Bar ── */}
      <div className="border-b border-slate-100 bg-slate-50 py-3.5">
        <Container>
          <Link
            href="/careers"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Open Roles</span>
          </Link>
        </Container>
      </div>

      {/* ── Job Header ── */}
      <section className="py-14 md:py-20 border-b border-slate-100 bg-slate-50">
        <Container>
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-semibold border border-blue-200">
                {job.industry}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">
                {job.type}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 font-medium">
                {job.experience}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-display leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-slate-900">{job.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Posted {job.postedDate}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button
                href={`/contact?job=${job.slug}&intent=career`}
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
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Key Responsibilities
                </h2>
                <div className="space-y-3">
                  {job.responsibilities.map((resp) => (
                    <div key={resp} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Required Qualifications
                </h2>
                <div className="space-y-3">
                  {job.requirements.map((req) => (
                    <div key={req} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                      <span className="leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-display">
                  Compensation & Benefits
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {job.benefits.map((b) => (
                    <div
                      key={b}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 flex items-center gap-2.5 font-medium"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Fast Application Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl p-7 border border-slate-200 bg-white shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 font-display mb-2">
                  Ready to Apply?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  Submit your details for this confidential placement. A TIUM recruitment partner
                  will contact you within 24 hours.
                </p>

                <div className="space-y-3">
                  <Button
                    href={`/contact?job=${job.slug}&intent=career`}
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    withArrow
                  >
                    Submit Application
                  </Button>
                  <Button
                    href="/careers"
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-slate-500 hover:text-slate-900"
                  >
                    Browse Other Roles
                  </Button>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5 font-medium">
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    100% Confidential Representation
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Equal Opportunity Employer
                  </p>
                  <p className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Direct Client Interview Coordination
                  </p>
                </div>
              </div>

              {/* Related Roles */}
              {relatedJobs.length > 0 && (
                <div className="rounded-xl p-5 border border-slate-200 bg-slate-50 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                    Related Positions
                  </div>
                  {relatedJobs.map((rj) => (
                    <Link
                      key={rj.id}
                      href={`/careers/${rj.slug}`}
                      className="block p-3 rounded-lg bg-white border border-slate-200 hover:border-blue-500 hover:shadow-sm transition-all"
                    >
                      <div className="text-xs font-bold text-slate-900 truncate font-display">
                        {rj.title}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between mt-1">
                        <span>{rj.location}</span>
                        <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
