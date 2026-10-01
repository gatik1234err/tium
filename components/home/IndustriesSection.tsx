import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { industries } from "@/data/industries";
import { ArrowRight, Cpu, Activity, Car, Flame, Rocket, Building2 } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  technology: Cpu,
  healthcare: Activity,
  automobiles: Car,
  "oil-gas": Flame,
  aeronautics: Rocket,
  management: Building2,
};

export function IndustriesSection() {
  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <Container>
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">Industries</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display leading-[1.08]">
              Talent that understands<br />your industry.
            </h2>
          </div>
          <Link
            href="/industries"
            className="shrink-0 text-sm font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
          >
            All 6 verticals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Industries grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 rounded-xl overflow-hidden">
          {industries.map((ind, i) => {
            const Icon = iconMap[ind.slug] || Cpu;
            return (
              <Link
                key={ind.id}
                href={`/industries/${ind.slug}`}
                className="group bg-white hover:bg-blue-600 transition-all duration-300 p-8 flex flex-col justify-between min-h-[300px] relative overflow-hidden"
              >
                {/* Number + Icon row */}
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-blue-200 num-label transition-colors">
                    {ind.number}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-500 flex items-center justify-center transition-all">
                    <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>

                {/* Industry image placeholder */}
                <div className="img-placeholder rounded-md h-24 mb-6 relative overflow-hidden group-hover:opacity-80 transition-opacity">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <p className="text-xs text-blue-700/40">{ind.name} image</p>
                  </div>
                </div>

                {/* Name + subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-white font-display transition-colors mb-1">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-400 group-hover:text-blue-200 font-mono uppercase tracking-wide transition-colors mb-4">
                    {ind.subtitle}
                  </p>

                  {/* Key stat */}
                  <div className="flex items-center justify-between border-t border-slate-100 group-hover:border-blue-500/40 pt-4 transition-colors">
                    <div>
                      <p className="text-sm font-bold text-blue-600 group-hover:text-white font-display">
                        {ind.stats[0]?.value}
                      </p>
                      <p className="text-xs text-slate-400 group-hover:text-blue-200">
                        {ind.stats[0]?.label}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
