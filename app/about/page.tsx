import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getValues, getPages } from "@/lib/store";
import { CheckCircle, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about TIUM Staffing — our mission, vision, values, and how we connect top-tier talent with ambitious enterprises nationwide.",
};

export default async function AboutPage() {
  const [values, pages] = await Promise.all([getValues(), getPages()]);
  const about = pages.about;

  return (
    <div className="pt-16 bg-white">
      {/* ── Page header ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            {about.eyebrow || "About TIUM Staffing"}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            {about.title || "Connecting human potential with organizational purpose."}
          </h1>
        </Container>
      </div>

      {/* ── Story + image ── */}
      <section className="border-b border-slate-100">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 py-0">
          {/* Image placeholder */}
          <div className="img-placeholder min-h-[400px] relative">
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full border-2 border-blue-300/40 flex items-center justify-center mx-auto mb-3">
                  <div className="w-7 h-7 rounded-full bg-blue-400/30" />
                </div>
                <p className="text-sm text-blue-700/50 font-medium">Austin HQ / Team Photo</p>
              </div>
            </div>
            {/* Overlay stat card */}
            <div className="absolute bottom-8 left-8 z-20 bg-white rounded-lg shadow-xl p-5 border border-slate-100">
              <p className="text-3xl font-bold text-slate-900 font-display">{about.statNumber || "98.4%"}</p>
              <p className="text-sm text-slate-500 mt-0.5">{about.statLabel || "Client SLA Fulfillment Rate"}</p>
            </div>
          </div>

          {/* Copy */}
          <div className="py-16 px-0 lg:pl-16 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 font-display leading-tight mb-4">
                {about.storyTitle || "Redefining recruitment through consultative excellence."}
              </h2>
              <div className="h-px w-12 bg-blue-600 mb-6" />
            </div>

            <p className="text-slate-600 leading-relaxed">
              {about.storyParagraph1 ||
                "TIUM was established to solve a critical market disconnect: traditional staffing agencies prioritize volume over precision, delivering resumes without evaluating whether a candidate will thrive in high-stakes environments."}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {about.storyParagraph2 ||
                "By embedding experienced recruiters who have worked in the industries they staff — from software engineering and aerospace to critical care nursing and offshore energy — we deliver candidates who are pre-vetted, culturally aligned, and immediately productive."}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                { v: "< 48h", l: "Avg Shortlist" },
                { v: "15k+", l: "Vetted Candidates" },
                { v: "85%+", l: "Repeat Clients" },
                { v: "6", l: "Industry Sectors" },
              ].map((s) => (
                <div key={s.l} className="border border-slate-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-blue-600 font-display">{s.v}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="soothing-blue-mesh border-b border-blue-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        <Container className="py-20 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-sky-300 font-mono">Our Mission</p>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">
              {about.missionTitle || "Empower businesses with the right talent and individuals with the right opportunities."}
            </h3>
            <div className="h-0.5 w-12 bg-gradient-to-r from-sky-400 to-transparent" />
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {about.missionDesc ||
                "We build genuine bridges between ambitious enterprises and exceptional professionals, grounded in integrity, transparency, and relentless client dedication."}
            </p>
          </div>
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-sky-300 font-mono">Our Vision</p>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight">
              {about.visionTitle || "A future where talent and opportunity converge seamlessly."}
            </h3>
            <div className="h-0.5 w-12 bg-gradient-to-r from-blue-400 to-transparent" />
            <p className="text-blue-100/80 text-sm sm:text-base leading-relaxed">
              {about.visionDesc ||
                "We envision a workforce ecosystem free from friction — powered by smart technology, authentic transparency, and advisors who have done the work themselves."}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Values ── */}
      <section className="py-24 border-b border-slate-100">
        <Container>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-px bg-blue-600" />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">Core Values</p>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 font-display mb-12">
            Five principles we never compromise on.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px bg-slate-100 rounded-xl overflow-hidden">
            {values.map((v) => (
              <div key={v.number} className="bg-white p-7 flex flex-col gap-4 hover:bg-blue-50 transition-colors group">
                <span className="font-mono text-xs font-bold text-slate-300 group-hover:text-blue-400 num-label">
                  {v.number}
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-display">{v.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-slate-50">
        <Container className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-slate-900 font-display">
            Ready to elevate your workforce?
          </h2>
          <p className="text-slate-500">
            Discover how TIUM can help your enterprise secure vetted professionals across North America.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button href="/contact?intent=talent" variant="primary" withArrow>
              Request Consultation
            </Button>
            <Button href="/services" variant="outline">
              Explore Services
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
