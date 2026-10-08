import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getIndustries, getIndustryBySlug } from "@/lib/store";
import {
  ArrowLeft, CheckCircle, ArrowRight,
  Cpu, Activity, Car, Flame, Rocket, Building2,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const iconMap: Record<string, React.ElementType> = {
  technology: Cpu, healthcare: Activity, automobiles: Car,
  "oil-gas": Flame, aeronautics: Rocket, management: Building2,
};

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = await getIndustryBySlug(slug);
  if (!ind) return { title: "Industry Not Found" };
  return { title: `${ind.name} Staffing`, description: ind.overview };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) notFound();

  const industries = await getIndustries();
  const Icon = iconMap[industry.slug] || Cpu;
  const currentIndex = industries.findIndex((i) => i.slug === slug);
  const next = industries[(currentIndex + 1) % industries.length];

  return (
    <div className="pt-16 bg-white">
      {/* ── Breadcrumb strip ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-3 flex items-center justify-between text-xs">
          <Link
            href="/industries"
            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Practices
          </Link>
          <span className="font-mono text-slate-400 num-label">
            {industry.number} / {String(industries.length).padStart(2, "0")}
          </span>
        </Container>
      </div>

      {/* ── Hero ── */}
      <section className="border-b border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Copy side */}
          <div className="lg:col-span-7 py-16 lg:pr-16 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs font-bold text-slate-400 num-label">{industry.number}</span>
              <span className="text-slate-200">/</span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
                Practice Group
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 font-display leading-[1.05]">
              {industry.name}
            </h1>
            <p className="text-base text-blue-600 font-mono font-medium">
              {industry.tagline}
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              {industry.overview}
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href={`/contact?intent=talent`} variant="primary" size="lg" withArrow>
                Request {industry.name} Talent
              </Button>
              <Button href={`/careers?industry=${encodeURIComponent(industry.name)}`} variant="outline" size="lg">
                View Openings
              </Button>
            </div>
          </div>

          {/* Stats side */}
          <div className="lg:col-span-5 py-16 lg:pl-16 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 font-mono mb-8">
                Practice Metrics
              </p>
              <div className="space-y-6">
                {industry.stats.map((s) => (
                  <div key={s.label} className="border-b border-slate-100 pb-5">
                    <p className="text-4xl font-bold text-slate-900 font-display">{s.value}</p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400">Austin HQ Practice Lead • Dedicated Recruiter Pool</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Market Insights ── */}
      <section className="py-20 border-b border-slate-100 bg-slate-50">
        <Container>
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 font-mono">
              MARKET DYNAMICS
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              Sector Talent Intelligence
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              {industry.marketInsights}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Specializations & Roles ── */}
      <section className="py-20 border-b border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Specializations */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 font-mono mb-4">
              SPECIALIZATIONS
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-6">
              Sub-disciplines & Domains
            </h2>
            <div className="space-y-3">
              {industry.specializations.map((spec) => (
                <div key={spec} className="flex items-center gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Roles */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 font-mono mb-4">
              COMMONLY PLACED
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-6">
              Key Job Titles
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {industry.keyRoles.map((role) => (
                <span
                  key={role}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Next Industry strip ── */}
      <section className="py-12 border-b border-slate-100">
        <Container className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-mono uppercase">Next Practice</p>
            <p className="text-lg font-bold text-slate-900 font-display">{next.name}</p>
          </div>
          <Button href={`/industries/${next.slug}`} variant="outline" withArrow>
            Explore Next
          </Button>
        </Container>
      </section>
    </div>
  );
}
