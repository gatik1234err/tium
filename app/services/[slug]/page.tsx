import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const nextService = services[(currentIndex + 1) % services.length];

  return (
    <div className="pt-16 bg-white">
      {/* ── Breadcrumb strip ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-3 flex items-center justify-between text-xs">
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Services
          </Link>
          <span className="font-mono text-slate-400 num-label">
            {service.number} / 06
          </span>
        </Container>
      </div>

      {/* ── Hero ── */}
      <section className="border-b border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-0 py-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {/* Copy side */}
          <div className="lg:col-span-7 py-16 lg:pr-16 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-slate-400 num-label">{service.number}</span>
              <div className="h-px w-8 bg-blue-600" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-blue-600 font-mono">
                {service.shortTitle}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 font-display leading-[1.05]">
              {service.title}
            </h1>
            <p className="text-xl text-blue-600 font-semibold leading-snug">{service.tagline}</p>
            <p className="text-slate-600 leading-relaxed text-base">{service.fullOverview}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button href={`/contact?service=${service.slug}&intent=staffing`} variant="primary" size="lg" withArrow>
                Inquire About {service.shortTitle}
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Speak to a Specialist
              </Button>
            </div>
          </div>

          {/* Image placeholder side */}
          <div className="lg:col-span-5">
            <div className="img-placeholder h-full min-h-[380px] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full border-2 border-blue-300/40 flex items-center justify-center mx-auto mb-3">
                    <div className="w-7 h-7 rounded-full bg-blue-400/30" />
                  </div>
                  <p className="text-sm text-blue-700/50">{service.shortTitle} Photo</p>
                </div>
              </div>
              <div className="absolute top-6 right-6 z-20">
                <span className="font-mono text-7xl font-bold text-blue-600/10 num-label">
                  {service.number}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Metrics strip ── */}
      <section className="bg-slate-50 border-b border-slate-100">
        <Container className="py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 rounded-xl overflow-hidden">
            {service.metrics.map((m) => (
              <div key={m.label} className="bg-white px-8 py-6">
                <p className="text-3xl font-bold text-blue-600 font-display">{m.value}</p>
                <p className="text-sm text-slate-500 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Benefits + Capabilities ── */}
      <section className="py-20 border-b border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-px bg-blue-600" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
                Strategic Benefits
              </p>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              Engineered for measurable ROI and hiring agility.
            </h2>
            <div className="space-y-4">
              {service.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3 text-slate-700 text-sm">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-px bg-slate-400" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 font-mono">
                Included Deliverables
              </p>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              What this engagement covers.
            </h2>
            <div className="space-y-2">
              {service.capabilities.map((c) => (
                <div
                  key={c}
                  className="flex items-center justify-between px-5 py-3.5 rounded-lg border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-100 transition-colors text-sm text-slate-800 font-medium"
                >
                  <span>{c}</span>
                  <span className="text-blue-600 text-lg leading-none">→</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── 4-Step Process ── */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <Container>
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-px bg-blue-600" />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
              Execution Roadmap
            </p>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 font-display mb-12">
            How we deliver this service.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden">
            {service.process.map((step) => (
              <div key={step.step} className="bg-white p-8 space-y-4">
                <span className="font-mono text-4xl font-bold text-slate-100 num-label">
                  {step.step}
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-display">{step.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Roles placed ── */}
      <section className="py-16 border-b border-slate-100">
        <Container>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500 font-mono mb-6">
            Representative Roles Placed
          </p>
          <div className="flex flex-wrap gap-2">
            {service.roles.map((r) => (
              <span
                key={r}
                className="text-sm px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {r}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Next service ── */}
      <section className="py-16 border-b border-slate-100 bg-slate-50">
        <Container className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Next Service</p>
            <h3 className="text-2xl font-bold text-slate-900 font-display">{nextService.title}</h3>
          </div>
          <div className="flex gap-3 shrink-0">
            <Button href={`/services/${nextService.slug}`} variant="outline">
              Explore
            </Button>
            <Button href={`/contact?service=${service.slug}`} variant="primary" withArrow>
              Request Now
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
