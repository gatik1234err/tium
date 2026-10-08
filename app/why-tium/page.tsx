import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getReasons, getPages } from "@/lib/store";
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Why TIUM | Workforce Excellence & Rigor",
  description:
    "Discover why premier enterprises choose TIUM Staffing for contingent labor, direct hire, and recruitment process outsourcing.",
};

export default async function WhyTiumPage() {
  const [reasons, pages] = await Promise.all([getReasons(), getPages()]);
  const whyTium = pages.whyTium;

  const comparisonItems = [
    {
      feature: "Candidate Shortlist Velocity",
      tium: "Within 48–72 hours via pre-cleared rosters",
      traditional: "2–4 weeks of cold outbound sourcing",
    },
    {
      feature: "Domain Recruiter Expertise",
      tium: "Former practitioners & domain specialists",
      traditional: "Generalist recruiters handling unrelated roles",
    },
    {
      feature: "Vetting & Credentialing",
      tium: "Multi-tier technical, behavioral & background check",
      traditional: "Basic keyword resume match with minimal checks",
    },
    {
      feature: "Client Retention Rate",
      tium: "85%+ repeat client partnership rate",
      traditional: "Transactional, one-off vendor interactions",
    },
    {
      feature: "Regulatory Governance",
      tium: "HIPAA, AS9100, ITAR, OSHA & wage compliance",
      traditional: "Variable compliance oversight",
    },
  ];

  return (
    <div className="pt-16 bg-white">
      {/* ── Page Header ── */}
      <div className="border-b border-slate-100 bg-slate-50">
        <Container className="py-20">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            {whyTium?.eyebrow || "The TIUM Advantage"}
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            {whyTium?.title || "Why leading organizations partner with TIUM."}
          </h1>
          <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
            {whyTium?.description ||
              "We eliminate the friction, latency, and uncertainty of workforce scaling through predictable SLAs, deep industry specialization, and consultative execution."}
          </p>
        </Container>
      </div>

      {/* ── Differentiators Grid ── */}
      <section className="py-20 border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reasons.map((r) => (
              <div
                key={r.number}
                className="p-8 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-blue-600 num-label">
                      {r.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {r.highlight}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs font-medium text-blue-600 font-mono">
                    {r.tagline}
                  </p>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {r.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison Table ── */}
      <section className="py-20 border-b border-slate-100 bg-slate-50/50">
        <Container>
          <div className="max-w-3xl mb-12 space-y-3">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
              DIRECT COMPARISON
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              TIUM vs Traditional Staffing Agencies
            </h2>
            <p className="text-slate-500 text-sm">
              See how our consultative methodology delivers higher precision and lower overhead.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-4 sm:p-5 font-semibold text-slate-900 font-mono uppercase text-xs">
                    Capability / Metric
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-blue-600 font-mono uppercase text-xs bg-blue-50/50">
                    TIUM Staffing
                  </th>
                  <th className="p-4 sm:p-5 font-semibold text-slate-500 font-mono uppercase text-xs">
                    Traditional Agency
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-4 sm:p-5 font-medium text-slate-900">
                      {item.feature}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-blue-900 bg-blue-50/30 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{item.tium}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                        <span>{item.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-white">
        <Container className="text-center max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
            Experience the TIUM Difference
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Contact our Austin workforce practice today to receive pre-screened candidate profiles in as little as 48 hours.
          </p>
          <div className="pt-2 flex justify-center">
            <Button href="/contact?intent=talent" variant="primary" size="lg" withArrow>
              Request Candidate Shortlist
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
