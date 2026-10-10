import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface DualCtaSectionProps {
  content?: {
    employers?: {
      eyebrow?: string;
      title?: string;
      desc?: string;
      ctaText?: string;
      ctaLink?: string;
      imageUrl?: string;
      imageAlt?: string;
    };
    candidates?: {
      eyebrow?: string;
      title?: string;
      desc?: string;
      ctaText?: string;
      ctaLink?: string;
      imageUrl?: string;
      imageAlt?: string;
    };
  };
}

export function DualCtaSection({ content }: DualCtaSectionProps) {
  const employers = content?.employers;
  const candidates = content?.candidates;

  return (
    <section className="bg-white border-b border-slate-100">
      {/* Full-width soothing blue headline bar */}
      <div className="soothing-blue-mesh py-20 relative overflow-hidden border-b border-blue-900/40">
        <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        <Container className="text-center space-y-4 relative z-10">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-sky-300 font-mono">
            Two Paths Forward
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display leading-[1.08] max-w-4xl mx-auto">
            Whether you&apos;re building a team or building your career,{" "}
            <span className="text-sky-300">let&apos;s talk.</span>
          </h2>
        </Container>
      </div>

      {/* Two-column cards */}
      <Container className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {/* Employers */}
          <div className="py-16 md:pr-16 space-y-6">
            {/* Image box */}
            <div className="rounded-xl h-48 relative overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
              {employers?.imageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={employers.imageUrl}
                    alt={employers.imageAlt || "Employer & Office Environment"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="img-placeholder rounded-xl h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <p className="text-sm text-blue-700/50 font-medium">Employer / Office Environment</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-l-2 border-blue-600 pl-5">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-blue-600 font-mono mb-2">
                {employers?.eyebrow || "For Organizations"}
              </p>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                {employers?.title || "Hire Specialized Talent"}
              </h3>
            </div>

            <p className="text-slate-500 leading-relaxed">
              {employers?.desc || "Scale your engineering, clinical, or corporate operations with pre-vetted professionals. Direct hire, contingent staffing, and full RPO models designed to meet tight deadlines."}
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              {[
                "Custom SLAs & rapid candidate shortlisting",
                "Full regulatory & credential clearance",
                "National sourcing, Austin HQ coordination",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <Button href={employers?.ctaLink || "/contact?intent=talent"} variant="primary" size="lg" withArrow>
              {employers?.ctaText || "Request Staffing Assistance"}
            </Button>
          </div>

          {/* Candidates */}
          <div className="py-16 md:pl-16 space-y-6">
            {/* Image box */}
            <div className="rounded-xl h-48 relative overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
              {candidates?.imageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={candidates.imageUrl}
                    alt={candidates.imageAlt || "Candidate / Professional Photo"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="img-placeholder rounded-xl h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <p className="text-sm text-blue-700/50 font-medium">Candidate / Professional Photo</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-l-2 border-slate-900 pl-5">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-slate-700 font-mono mb-2">
                For Professionals
              </p>
              <h3 className="text-2xl font-bold text-slate-900 font-display">
                Explore Career Opportunities
              </h3>
            </div>

            <p className="text-slate-500 leading-relaxed">
              Unlock high-impact career pathways with industry-leading enterprises. Browse permanent,
              contract, and executive roles across technology, healthcare, aerospace, and energy.
            </p>

            <ul className="space-y-2 text-sm text-slate-700">
              {[
                "Confidential career representation",
                "Direct access to hiring decision-makers",
                "Competitive compensation benchmarking",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>

            <Button href="/careers" variant="outline" size="lg" withArrow>
              Browse Open Positions
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
