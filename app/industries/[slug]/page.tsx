import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { industries } from "@/data/industries";
import {
  ArrowLeft, CheckCircle, ArrowRight,
  Cpu, Activity, Car, Flame, Rocket, Building2,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  technology: Cpu, healthcare: Activity, automobiles: Car,
  "oil-gas": Flame, aeronautics: Rocket, management: Building2,
};

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return { title: "Industry Not Found" };
  return { title: `${ind.name} Staffing`, description: ind.overview };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const Icon = iconMap[industry.slug] || Cpu;
  const currentIndex = industries.findIndex((i) => i.slug === slug);
  const next = industries[(currentIndex + 1) % industries.length];

  return (
    <div className="pt-16 bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-3 flex items-center justify-between text-xs">
          <Link href="/industries" className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> All Industries
          </Link>
          <span className="font-mono text-slate-400 num-label">{industry.number} / 06</span>
        </Container>
      </div>

      {/* Hero */}
      <section className="border-b border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Copy */}
          <div className="lg:col-span-7 py-16 lg:pr-16 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-blue-600 font-mono">
                {industry.subtitle}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 font-display leading-[1.05]">
              {industry.name}
            </h1>
            <p className="text-xl text-blue-600 font-semibold">{industry.tagline}</p>
            <p className="text-slate-600 leading-relaxed">{industry.overview}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={`/contact?industry=${industry.slug}&intent=talent`} variant="primary" size="lg" withArrow>
                Request {industry.name} Talent
              </Button>
              <Button href="/careers" variant="outline" size="lg">
                View Open Roles
              </Button>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="lg:col-span-5">
            <div className="img-placeholder h-full min-h-[380px] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center">
                  <Icon className="w-12 h-12 text-blue-400/30 mx-auto mb-3" />
                  <p className="text-sm text-blue-700/50">{industry.name} Industry Photo</p>
                </div>
              </div>
              <div className="absolute top-6 right-6 z-20 font-mono text-7xl font-bold text-blue-600/10 num-label">
                {industry.number}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 border-b border-slate-100">
        <Container className="py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 rounded-xl overflow-hidden">
            {industry.stats.map((s) => (
              <div key={s.label} className="bg-white px-8 py-6">
                <p className="text-3xl font-bold text-blue-600 font-display">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Market insights + specializations */}
      <section className="py-20 border-b border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-blue-600" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">Market Dynamics</p>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              Navigating complex talent landscapes in {industry.name}.
            </h2>
            <p className="text-slate-600 leading-relaxed">{industry.marketInsights}</p>

            <div className="space-y-2.5 pt-2">
              {industry.specializations.map((spec) => (
                <div key={spec} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-px bg-slate-400" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 font-mono">Benchmark Roles Placed</p>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              Roles successfully deployed.
            </h2>
            <div className="space-y-2">
              {industry.keyRoles.map((role) => (
                <div
                  key={role}
                  className="flex items-center justify-between px-5 py-3.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-colors"
                >
                  <span className="text-sm font-medium text-slate-800">{role}</span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Placed</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Next industry */}
      <section className="py-16 bg-slate-50 border-b border-slate-100">
        <Container className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Next Vertical</p>
            <h3 className="text-2xl font-bold text-slate-900 font-display">{next.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{next.subtitle}</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button href={`/industries/${next.slug}`} variant="outline">Explore</Button>
            <Button href={`/contact?industry=${industry.slug}&intent=talent`} variant="primary" withArrow>Request Talent</Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
