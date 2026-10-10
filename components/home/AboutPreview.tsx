import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";

interface AboutPreviewProps {
  content?: {
    imageUrl?: string;
    imageAlt?: string;
  };
}

export function AboutPreview({ content }: AboutPreviewProps) {
  const credentials = [
    { num: "15+", label: "Years Combined Experience" },
    { num: "85%", label: "Repeat Client Rate" },
    { num: "6", label: "Dedicated Sector Practices" },
    { num: "100%", label: "Regulatory Compliance" },
  ];

  return (
    <section className="py-24 bg-slate-50 border-b border-slate-100">
      <Container>
        {/* Section label row */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <div className="w-10 h-px bg-blue-600" />
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">About TIUM</p>
          </div>
          <Link
            href="/about"
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            Learn More <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: headline + copy */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display leading-[1.1]">
              Built to connect exceptional talent with thriving organizations.
            </h2>
            <p className="text-slate-500 leading-relaxed">
              TIUM Staffing was founded on a conviction: workforce solutions should be as dynamic
              and innovative as the industries they serve. We partner with enterprises to eliminate
              bottlenecks and unlock sustained organizational performance.
            </p>
            <Button href="/about" variant="primary" withArrow>
              Our Story
            </Button>
          </div>

          {/* Right: image placeholder / custom image + credential row */}
          <div className="lg:col-span-7 space-y-6">
            {/* Image container */}
            <div className="rounded-xl h-64 relative overflow-hidden bg-slate-900 border border-slate-200 shadow-lg">
              {content?.imageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.imageUrl}
                    alt={content.imageAlt || "Team / Austin Office"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="img-placeholder rounded-lg h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full border-2 border-blue-300/40 flex items-center justify-center mx-auto mb-2">
                        <div className="w-7 h-7 rounded-full bg-blue-400/30" />
                      </div>
                      <p className="text-sm text-blue-700/50">Team / Austin Office</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Credential grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 rounded-lg overflow-hidden">
              {credentials.map((c) => (
                <div key={c.label} className="bg-white p-5 text-center">
                  <p className="text-2xl font-bold text-blue-600 font-display">{c.num}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
