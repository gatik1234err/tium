import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getServices, getServiceBySlug } from "@/lib/store";
import { ArrowLeft, Check, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const services = await getServices();
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
            {service.number} / {String(services.length).padStart(2, "0")}
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
              <span className="text-slate-200">/</span>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
                Workforce Solution
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 font-display leading-[1.05]">
              {service.title}
            </h1>
            <p className="text-base text-blue-600 font-mono font-medium">
              {service.tagline}
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              {service.fullOverview || service.description}
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Button href={`/contact?intent=staffing&service=${encodeURIComponent(service.shortTitle)}`} variant="primary" size="lg" withArrow>
                Request Consultation
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Talk to Practice Lead
              </Button>
            </div>
          </div>

          {/* Metrics side */}
          <div className="lg:col-span-5 py-16 lg:pl-16 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 font-mono mb-8">
                Performance Benchmarks
              </p>
              <div className="space-y-6">
                {service.metrics.map((m) => (
                  <div key={m.label} className="border-b border-slate-100 pb-5">
                    <p className="text-4xl font-bold text-slate-900 font-display">{m.value}</p>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-8 border-t border-slate-100">
              <p className="text-xs text-slate-400">Headquartered in Austin, Texas • National Delivery</p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Capabilities + Roles ── */}
      <section className="py-20 border-b border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Capabilities */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 font-mono mb-4">
              CAPABILITIES
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-6">
              Scope of Service Delivery
            </h2>
            <div className="space-y-3">
              {service.capabilities.map((cap) => (
                <div key={cap} className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-blue-600" />
                  </div>
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Roles */}
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 font-mono mb-4">
              PLACEMENTS
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mb-6">
              Commonly Filled Profiles
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {service.roles.map((r) => (
                <span
                  key={r}
                  className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Process ── */}
      {service.process && service.process.length > 0 && (
        <section className="py-20 border-b border-slate-100 bg-slate-50">
          <Container>
            <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 font-mono">
                ENGAGEMENT METHODOLOGY
              </p>
              <h2 className="text-3xl font-bold text-slate-900 font-display">
                How We Deliver
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.process.map((step) => (
                <div key={step.step} className="bg-white p-6 rounded-xl border border-slate-200 space-y-3">
                  <span className="font-mono text-2xl font-bold text-blue-600 num-label">
                    {step.step}
                  </span>
                  <h3 className="font-bold text-slate-900 font-display text-base">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── Next service navigation ── */}
      <section className="py-12 border-b border-slate-100">
        <Container className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-mono uppercase">Next Service</p>
            <p className="text-lg font-bold text-slate-900 font-display">{nextService.title}</p>
          </div>
          <Button href={`/services/${nextService.slug}`} variant="outline" withArrow>
            View Next
          </Button>
        </Container>
      </section>
    </div>
  );
}
