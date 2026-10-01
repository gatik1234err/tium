"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { reasons } from "@/data/reasons";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function WhyTiumSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <Container>
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
              Why Choose TIUM
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display leading-[1.08]">
              Why businesses<br />choose TIUM.
            </h2>
          </div>
          <Link
            href="/why-tium"
            className="shrink-0 text-sm font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
          >
            Full comparison <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reasons — editorial numbered list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 rounded-xl overflow-hidden">
          {reasons.map((r, i) => (
            <div
              key={r.number}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "bg-white p-8 transition-all duration-200",
                hovered === i ? "bg-blue-600" : ""
              )}
            >
              <div className="flex items-start gap-6">
                <span className={cn(
                  "font-mono text-3xl font-bold num-label leading-none shrink-0 transition-colors",
                  hovered === i ? "text-blue-300" : "text-slate-100"
                )}>
                  {r.number}
                </span>
                <div>
                  <h3 className={cn(
                    "text-xl font-bold font-display mb-2 transition-colors",
                    hovered === i ? "text-white" : "text-slate-900"
                  )}>
                    {r.title}
                  </h3>
                  <p className={cn(
                    "text-sm leading-relaxed transition-colors",
                    hovered === i ? "text-blue-100" : "text-slate-500"
                  )}>
                    {r.description}
                  </p>
                  <div className={cn(
                    "mt-3 inline-flex items-center text-xs font-bold uppercase tracking-wide transition-colors",
                    hovered === i ? "text-white" : "text-blue-600"
                  )}>
                    {r.highlight}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
