import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { industries } from "@/data/industries";
import { Cpu, Activity, Car, Flame, Rocket, Building2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "TIUM serves six critical industry verticals: Technology, Healthcare, Automobiles & EV, Oil & Gas, Aeronautics, and Management.",
};

const iconMap: Record<string, React.ElementType> = {
  technology: Cpu, healthcare: Activity, automobiles: Car,
  "oil-gas": Flame, aeronautics: Rocket, management: Building2,
};

export default function IndustriesPage() {
  return (
    <div className="pt-16 bg-white">
      {/* ── Page header ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            Industry Practices
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            Specialized staffing across six critical verticals.
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
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-0 py-12 block"
                >
                  {/* Left */}
                  <div className="lg:col-span-5 flex items-start gap-6 mb-6 lg:mb-0 lg:pr-12">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center shrink-0 transition-all">
                      <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-slate-400 num-label">{ind.number}</span>
                      <h2 className="text-2xl font-bold text-slate-900 font-display mt-1 group-hover:text-blue-600 transition-colors">
                        {ind.name}
                      </h2>
                      <p className="text-sm text-slate-500 mt-0.5">{ind.subtitle}</p>
                    </div>
                  </div>

                  {/* Middle: overview */}
                  <div className="lg:col-span-4 lg:border-l lg:border-r border-slate-100 lg:px-10 mb-6 lg:mb-0">
                    <p className="text-sm text-slate-600 leading-relaxed">{ind.tagline}</p>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {ind.keyRoles.slice(0, 3).map((r) => (
                        <span key={r} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: image placeholder + stat */}
                  <div className="lg:col-span-3 lg:pl-10 space-y-3">
                    <div className="img-placeholder rounded-lg aspect-video relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <Icon className="w-8 h-8 text-blue-400/30" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-bold text-blue-600 font-display">{ind.stats[0]?.value}</p>
                        <p className="text-xs text-slate-400">{ind.stats[0]?.label}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-600 flex items-center justify-center transition-all">
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-50">
        <Container className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 font-display">
            Don&apos;t see your sector?
          </h2>
          <p className="text-slate-500">
            TIUM builds bespoke recruitment practices for emerging markets. Let&apos;s discuss your industry requirements.
          </p>
          <Button href="/contact" variant="primary" size="lg" withArrow>
            Discuss Your Industry
          </Button>
        </Container>
      </section>
    </div>
  );
}
