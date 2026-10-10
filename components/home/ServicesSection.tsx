"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceItem } from "@/lib/types";

interface ServicesSectionProps {
  services: ServiceItem[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [active, setActive] = useState(0);

  if (!services || services.length === 0) return null;

  return (
    <section className="py-24 bg-white border-b border-slate-100">
      <Container>
        {/* Heading row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-0">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">Services</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display leading-[1.08]">
              Workforce solutions<br />built around your needs.
            </h2>
          </div>
          <Link
            href="/services"
            className="shrink-0 text-sm font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
          >
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100 mt-12 mb-0" />

        {/* Services interactive list + panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* List */}
          <div className="lg:col-span-7 divide-y divide-slate-100">
            {services.map((s, i) => {
              const isActive = active === i;
              return (
                <div
                  key={s.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex items-center justify-between py-6 px-4 -mx-4 cursor-pointer transition-all duration-200 rounded-lg",
                    isActive ? "bg-blue-50" : "hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-6">
                    <span className={cn(
                      "font-mono text-sm num-label font-semibold transition-colors w-7 shrink-0",
                      isActive ? "text-blue-600" : "text-slate-300"
                    )}>
                      {s.number}
                    </span>
                    <div>
                      <h3 className={cn(
                        "text-xl font-bold font-display transition-colors",
                        isActive ? "text-blue-600" : "text-slate-900 group-hover:text-slate-700"
                      )}>
                        {s.title}
                      </h3>
                      {isActive && (
                        <p className="text-sm text-slate-500 mt-1 max-w-md leading-relaxed">
                          {s.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/services/${s.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "w-9 h-9 rounded flex items-center justify-center shrink-0 transition-all",
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-700"
                    )}
                    aria-label={`View ${s.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Preview panel — sticky */}
          <div className="hidden lg:block lg:col-span-5 lg:pl-12 border-l border-slate-100 pt-2">
            <div className="sticky top-28 space-y-6">
              {/* Service image / custom image */}
              <div className="rounded-xl aspect-video relative overflow-hidden bg-slate-900 border border-slate-200 shadow-lg">
                {services[active].imageUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={services[active].imageUrl}
                      alt={services[active].imageAlt || services[active].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                  </>
                ) : (
                  <div className="img-placeholder rounded-lg h-full w-full">
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="text-center">
                        <p className="text-sm text-blue-700/60 font-medium">
                          {services[active].shortTitle} illustration
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Service number overlay */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="font-mono text-5xl font-bold text-blue-600/30 num-label">
                    {services[active].number}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900 font-display mb-2">
                  {services[active].title}
                </h4>
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {services[active].tagline}
                </p>

                {/* Key metrics */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {services[active].metrics.slice(0, 2).map((m) => (
                    <div key={m.label} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <p className="text-lg font-bold text-slate-900 font-display">{m.value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/services/${services[active].slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Explore specifications <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
