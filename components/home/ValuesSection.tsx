"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { values } from "@/data/values";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ValuesSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <Container>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-px bg-blue-600" />
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">Values</p>
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display leading-[1.08] mb-16">
          What we believe in.
        </h2>

        {/* Desktop: side-by-side list + detail */}
        <div className="hidden md:grid md:grid-cols-12 gap-0 border border-slate-200 rounded-xl overflow-hidden">
          {/* Left: numbered list */}
          <div className="md:col-span-5 border-r border-slate-200 divide-y divide-slate-100">
            {values.map((v, i) => (
              <button
                key={v.number}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full text-left px-8 py-6 flex items-center justify-between group transition-all",
                  active === i ? "bg-blue-600" : "hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-5">
                  <span className={cn(
                    "font-mono text-sm num-label font-bold transition-colors",
                    active === i ? "text-blue-200" : "text-slate-300"
                  )}>
                    {v.number}
                  </span>
                  <span className={cn(
                    "text-xl font-bold font-display transition-colors",
                    active === i ? "text-white" : "text-slate-900"
                  )}>
                    {v.title}
                  </span>
                </div>
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all",
                  active === i ? "bg-white scale-125" : "bg-slate-200"
                )} />
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="md:col-span-7 p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-start justify-between">
                <span className="font-mono text-6xl font-bold text-slate-100 num-label leading-none">
                  {values[active].number}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 font-display">
                {values[active].title}
              </h3>
              <p className="text-base font-semibold text-blue-600">
                {values[active].tagline}
              </p>
              <p className="text-slate-500 leading-relaxed">
                {values[active].description}
              </p>
              <ul className="space-y-3 pt-2">
                {values[active].points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
          {values.map((v, i) => {
            const isOpen = active === i;
            return (
              <div key={v.number}>
                <button
                  type="button"
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className={cn(
                    "w-full text-left px-6 py-5 flex items-center justify-between",
                    isOpen ? "bg-blue-600" : "bg-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className={cn("font-mono text-xs font-bold num-label", isOpen ? "text-blue-200" : "text-slate-400")}>
                      {v.number}
                    </span>
                    <span className={cn("text-lg font-bold font-display", isOpen ? "text-white" : "text-slate-900")}>
                      {v.title}
                    </span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "rotate-180 text-white" : "text-slate-400")} />
                </button>
                {isOpen && (
                  <div className="px-6 py-6 bg-slate-50 space-y-3">
                    <p className="text-sm font-semibold text-blue-600">{v.tagline}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.description}</p>
                    <ul className="space-y-2 pt-1">
                      {v.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
