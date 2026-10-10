import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface IntroductionProps {
  content?: {
    eyebrow?: string;
    headline?: string;
    description?: string;
    quote?: string;
    quoteAuthor?: string;
    proofPoints?: string[];
    imageUrl?: string;
    imageAlt?: string;
  };
}

export function Introduction({ content }: IntroductionProps) {
  const proof = content?.proofPoints && content.proofPoints.length > 0 ? content.proofPoints : [
    "15,000+ pre-screened candidates across 6 industry verticals",
    "98.4% SLA compliance across all active client engagements",
    "Average candidate shortlist delivered within 48 hours",
    "Full regulatory, credential, and background compliance",
  ];

  return (
    <section className="py-0 bg-white border-b border-slate-100">
      <Container className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {/* Left — image placeholder / custom image */}
        <div className="relative min-h-[380px] lg:min-h-[520px] overflow-hidden bg-slate-900">
          {content?.imageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.imageUrl}
                alt={content.imageAlt || "Office / Team Photo"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="img-placeholder min-h-[380px] lg:min-h-[520px] w-full h-full">
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <div className="w-16 h-16 rounded-full border-2 border-blue-300/40 flex items-center justify-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-400/30" />
                </div>
                <p className="text-sm text-blue-700/50 font-medium">Office / Team Photo</p>
              </div>
            </div>
          )}
          {/* Pulled quote overlay */}
          <div className="absolute bottom-8 left-8 right-8 z-20">
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-2xl">
              <p className="text-lg font-bold font-display leading-snug">
                &ldquo;{content?.quote || "People are the foundation of every successful organization."}&rdquo;
              </p>
              <p className="text-blue-200 text-xs mt-2 font-medium">— {content?.quoteAuthor || "TIUM Staffing"}</p>
            </div>
          </div>
        </div>

        {/* Right — copy */}
        <div className="py-16 px-0 lg:pl-16 space-y-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
              WHO WE ARE
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 font-display leading-[1.1] mb-6">
              Precision workforce solutions for demanding industries.
            </h2>
            <p className="text-slate-500 leading-relaxed text-base">
              At TIUM Staffing, we recognize that behind every groundbreaking product, flawless clinical
              outcome, and efficient production line are extraordinary people. We provide workforce solutions
              tailored precisely to your needs — emphasizing client satisfaction, pre-qualified talent, and
              long-term partnership.
            </p>
          </div>

          {/* Proof points */}
          <div className="space-y-3">
            {proof.map((p) => (
              <div key={p} className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{p}</span>
              </div>
            ))}
          </div>

          <Button href="/about" variant="outline" withArrow>
            More About TIUM
          </Button>
        </div>
      </Container>
    </section>
  );
}
