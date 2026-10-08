import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/store";
import { ArrowRight, Check } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore TIUM's full suite of workforce solutions: RPO, Contingent Staffing, Direct Hire, Contract Hire, Lead Generation, and Candidate Sourcing.",
};

export default async function ServicesPage() {
  const services = await getServices();

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
            {services.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-16 group"
              >
                {/* Left: number + title */}
                <div className="lg:col-span-5 lg:pr-16 space-y-4 mb-8 lg:mb-0">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold font-mono tracking-widest text-blue-600">
                      {s.number}
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                    <Link href={`/services/${s.slug}`}>{s.title}</Link>
                  </h2>
                  <p className="text-sm font-medium text-blue-600 font-mono">
                    {s.tagline}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {s.description}
                  </p>
                  <div className="pt-2">
                    <Button href={`/services/${s.slug}`} variant="outline" size="sm" withArrow>
                      Explore {s.shortTitle}
                    </Button>
                  </div>
                </div>

                {/* Right: benefits */}
                <div className="lg:col-span-7 lg:pl-16 lg:border-l border-slate-100 flex flex-col justify-center">
                  <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 font-mono mb-6">
                    Core Advantages
                  </p>
                  <div className="space-y-4">
                    {s.benefits.map((b) => (
                      <div key={b} className="flex items-start gap-4 text-sm text-slate-700">
                        <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="leading-relaxed">{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6">
                    {s.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="text-2xl font-bold text-slate-900 font-display">{m.value}</p>
                        <p className="text-xs text-slate-400">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-slate-50">
        <Container className="text-center max-w-2xl mx-auto space-y-6">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
            GET STARTED
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display">
            Need a custom workforce model?
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Our talent strategists design hybrid recruitment models combining contingent speed with RPO scalability.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/contact?intent=talent" variant="primary" size="lg" withArrow>
              Schedule Consultation
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
