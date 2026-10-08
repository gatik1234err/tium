import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getIndustries } from "@/lib/store";
import { Cpu, Activity, Car, Flame, Rocket, Building2, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "TIUM serves critical industry verticals: Technology, Healthcare, Automobiles & EV, Oil & Gas, Aeronautics, and Management.",
};

const iconMap: Record<string, React.ElementType> = {
  technology: Cpu,
  healthcare: Activity,
  automobiles: Car,
  "oil-gas": Flame,
  aeronautics: Rocket,
  management: Building2,
};

export default async function IndustriesPage() {
  const industries = await getIndustries();

  return (
    <div className="pt-16 bg-white">
      {/* ── Page header ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            Industry Practices
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            Specialized staffing across critical verticals.
          </h1>
          <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
            Our dedicated practice groups place professionals with the domain expertise and credentials required in demanding, high-stakes industries.
          </p>
        </Container>
      </div>

      {/* ── Industries ── */}
      <section className="py-0 border-b border-slate-100">
        <Container className="py-0">
          <div className="divide-y divide-slate-100">
            {industries.map((ind) => {
              const Icon = iconMap[ind.slug] || Cpu;
              return (
                <Link
                  key={ind.id}
                  href={`/industries/${ind.slug}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-16 group hover:bg-slate-50/50 transition-colors block"
                >
                  {/* Left */}
                  <div className="lg:col-span-5 lg:pr-16 space-y-4 mb-8 lg:mb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 num-label">
                        {ind.number}
                      </span>
                      <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                      {ind.name}
                    </h2>
                    <p className="text-sm font-medium text-blue-600 font-mono">
                      {ind.subtitle}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {ind.overview}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-sm font-semibold text-blue-600">
                      <span>Explore Practice</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Right: stats + specializations */}
                  <div className="lg:col-span-7 lg:pl-16 lg:border-l border-slate-100 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 font-mono mb-4">
                        Practice Specializations
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {ind.specializations.slice(0, 5).map((spec) => (
                          <span
                            key={spec}
                            className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-6">
                      {ind.stats.map((s) => (
                        <div key={s.label}>
                          <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">{s.value}</p>
                          <p className="text-xs text-slate-400 mt-1">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
