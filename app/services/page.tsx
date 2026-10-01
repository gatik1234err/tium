import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore TIUM's full suite of workforce solutions: RPO, Contingent Staffing, Direct Hire, Contract Hire, Lead Generation, and Candidate Sourcing.",
};

export default function ServicesPage() {
  return (
    <div className="pt-16 bg-white">
      {/* ── Page header ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            Workforce Solutions
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            Flexible staffing, engineered for velocity.
          </h1>
          <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
            From on-demand contingent labor to full-scale recruitment process outsourcing,
            we construct tailored talent pipelines that adapt to your business trajectory.
          </p>
        </Container>
      </div>

      {/* ── Services list ── */}
      <section className="py-0 border-b border-slate-100">
        <Container className="py-0">
          <div className="divide-y divide-slate-100">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-16 group"
              >
                {/* Left: number + title */}
                <div className="lg:col-span-5 lg:pr-16 space-y-4 mb-8 lg:mb-0">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs font-bold text-slate-300 num-label">{s.number}</span>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-sm font-semibold text-blue-600">{s.tagline}</p>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors border-b border-slate-300 hover:border-blue-600 pb-0.5"
                  >
                    View full specifications <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Middle: description + capabilities */}
                <div className="lg:col-span-4 lg:border-l lg:border-r border-slate-100 lg:px-10 space-y-4 mb-8 lg:mb-0">
                  <p className="text-slate-600 leading-relaxed text-sm">{s.description}</p>
                  <div className="space-y-2 pt-2">
                    {s.capabilities.slice(0, 4).map((c) => (
                      <div key={c} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: metrics + image placeholder */}
                <div className="lg:col-span-3 lg:pl-10 space-y-4">
                  {/* Image placeholder */}
                  <div className="img-placeholder rounded-lg aspect-video relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <p className="text-xs text-blue-700/40">{s.shortTitle}</p>
                    </div>
                    <div className="absolute top-3 left-3 z-20 font-mono text-3xl font-bold text-blue-600/20 num-label">
                      {s.number}
                    </div>
                  </div>
                  {/* Key metric */}
                  <div className="border border-slate-100 rounded-lg p-4">
                    <p className="text-xl font-bold text-blue-600 font-display">{s.metrics[0]?.value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.metrics[0]?.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-slate-50">
        <Container className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 font-display">
            Need a custom staffing model?
          </h2>
          <p className="text-slate-500">
            Our strategists will build a delivery roadmap aligned with your budget, timeline,
            and compliance requirements.
          </p>
          <Button href="/contact?intent=talent" variant="primary" size="lg" withArrow>
            Request a Custom Plan
          </Button>
        </Container>
      </section>
    </div>
  );
}
