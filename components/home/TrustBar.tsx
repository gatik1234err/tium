import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Cpu, Activity, Car, Flame, Rocket, Building2 } from "lucide-react";

export function TrustBar() {
  const industries = [
    { name: "Information Technology", slug: "technology", icon: Cpu },
    { name: "Healthcare", slug: "healthcare", icon: Activity },
    { name: "Automobiles & EV", slug: "automobiles", icon: Car },
    { name: "Oil & Gas", slug: "oil-gas", icon: Flame },
    { name: "Aeronautics", slug: "aeronautics", icon: Rocket },
    { name: "Management", slug: "management", icon: Building2 },
  ];

  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <Container className="py-0">
        <div className="flex flex-col md:flex-row">
          {/* Label */}
          <div className="flex items-center gap-3 pr-8 py-5 border-b md:border-b-0 md:border-r border-slate-200 shrink-0">
            <div className="w-px h-5 bg-blue-600" />
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-slate-500 whitespace-nowrap font-mono">
              Sectors Served
            </span>
          </div>
          {/* Industry links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-y sm:divide-y-0 divide-slate-200 flex-1">
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="flex items-center gap-2.5 px-5 py-4 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-white transition-all group"
                >
                  <Icon className="w-3.5 h-3.5 text-blue-600 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{ind.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
