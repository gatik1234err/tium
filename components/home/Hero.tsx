"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MapPin, CheckCircle, ArrowUpRight } from "lucide-react";

// Thin horizontal rule with blue accent
function Rule() {
  return <div className="h-px w-full bg-slate-200" />;
}

interface HeroProps {
  content?: {
    headlinePart1: string;
    headlineAccent: string;
    headlinePart2: string;
    description: string;
    primaryCtaText: string;
    primaryCtaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    stats?: { value: string; label: string }[];
  };
}

export function Hero({ content }: HeroProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Employers", "Candidates", "Partners"];

  const stats = content?.stats && content.stats.length > 0 ? content.stats : [
    { value: "< 48h", label: "Average Shortlist" },
    { value: "98.4%", label: "SLA Fulfillment" },
    { value: "6", label: "Industry Practices" },
  ];

  return (
    <section className="pt-24 sm:pt-28 bg-white overflow-hidden">

      {/* ── Hero main grid ── */}
      <Container className="grid grid-cols-1 lg:grid-cols-12 pt-12 pb-0 gap-0">
        {/* Left: Copy */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between pb-16 pr-0 lg:pr-16 border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="space-y-8">
            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold font-display tracking-tight text-slate-900 leading-[1.05]">
              {content?.headlinePart1 || "The right talent"}{" "}
              <span className="text-blue-600">{content?.headlineAccent || "can change"}</span>{" "}
              {content?.headlinePart2 || "everything."}
            </h1>

            {/* Descriptor */}
            <p className="text-lg text-slate-500 leading-relaxed max-w-md">
              {content?.description ||
                "TIUM connects businesses with exceptional talent through flexible, industry-focused workforce solutions across six critical sectors."}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button href={content?.primaryCtaLink || "/contact?intent=talent"} variant="primary" size="lg" withArrow>
                {content?.primaryCtaText || "Find Talent"}
              </Button>
              <Button href={content?.secondaryCtaLink || "/careers"} variant="outline" size="lg">
                {content?.secondaryCtaText || "Explore Careers"}
              </Button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image placeholder + candidate card overlay */}
        <div className="lg:col-span-6 xl:col-span-7 relative min-h-[420px] lg:min-h-0">
          {/* Main image placeholder */}
          <div className="img-placeholder w-full h-full min-h-[420px] lg:min-h-[580px]">
            {/* Subtle label on image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <div className="w-16 h-16 rounded-full border-2 border-blue-300/50 flex items-center justify-center mb-3">
                <div className="w-8 h-8 rounded-full bg-blue-400/40" />
              </div>
              <p className="text-sm text-blue-700/60 font-medium tracking-wide">Hero Image</p>
              <p className="text-xs text-blue-600/40 mt-0.5">Professional workforce photography</p>
            </div>

            {/* Floating candidate profile card */}
            <div className="absolute bottom-8 left-8 right-8 sm:right-auto sm:max-w-xs bg-white rounded-xl shadow-2xl p-5 border border-slate-100 z-20">
              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Available Now
                </div>
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded">IT · Austin, TX</span>
              </div>

              {/* Role */}
              <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wide mb-0.5">Candidate Profile</p>
              <h3 className="text-lg font-bold text-slate-900 font-display">Senior Cloud Architect</h3>
              <p className="text-sm text-slate-500 mt-0.5">10+ yrs · AWS · Kubernetes · Microservices</p>

              {/* Quick facts */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  Background Verified
                </div>
                <span className="text-xs font-bold text-blue-600">Top 1% Talent</span>
              </div>
            </div>

            {/* Second smaller card */}
            <div className="absolute top-10 right-8 hidden sm:block bg-white rounded-xl shadow-xl p-4 border border-slate-100 z-20 w-52">
              <p className="text-[11px] text-slate-400 font-mono uppercase tracking-wide mb-1">Also available</p>
              <p className="text-sm font-bold text-slate-900 font-display">ICU Clinical Lead</p>
              <p className="text-xs text-slate-500">Healthcare · Houston, TX</p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Credentialed RN
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
