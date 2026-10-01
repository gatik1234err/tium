import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { reasons } from "@/data/reasons";
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Why TIUM | Workforce Excellence & Rigor",
  description:
    "Discover the eight reasons premier enterprises choose TIUM Staffing for contingent labor, direct hire, and recruitment process outsourcing.",
};

export default function WhyTiumPage() {
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
            The TIUM Advantage
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 font-display leading-[1.05] max-w-3xl">
            Why leading organizations partner with TIUM.
          </h1>
          <p className="mt-6 text-xl text-slate-500 max-w-2xl leading-relaxed">
            We eliminate the friction, latency, and uncertainty of workforce scaling through
            predictable SLAs, deep industry specialization, and consultative execution.
          </p>
        </Container>
      </div>

      {/* ── Eight Core Reasons ── */}
      <section className="py-20 border-b border-slate-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-3">
                Foundational Pillars
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
                Eight Core Reasons to Choose TIUM
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md mt-4 md:mt-0">
              Our service framework is built to safeguard your business velocity and institutional culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason) => (
              <div
                key={reason.number}
                className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-50/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-bold text-blue-600">
                      {reason.number}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                      {reason.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 font-display mb-2 group-hover:text-blue-600 transition-colors">
                    {reason.title}
                  </h3>

                  <p className="text-sm text-blue-600 font-medium mb-3">
                    {reason.tagline}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Verified TIUM Operational Standard</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison: TIUM vs Legacy Staffing ── */}
      <section className="py-20 border-b border-slate-100 bg-slate-50">
        <Container>
          <div className="mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-3">
              Market Comparison
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-display">
              How TIUM Outperforms Traditional Agencies
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mt-2">
              A transparent look at the structural differences that drive our higher candidate quality and client satisfaction.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm text-slate-600 border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-xs font-mono uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">Evaluation Dimension</th>
                  <th className="py-4 px-6 text-blue-700 bg-blue-50/50 font-bold">TIUM Staffing</th>
                  <th className="py-4 px-6 text-slate-500">Legacy Staffing Agencies</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonItems.map((item) => (
                  <tr key={item.feature} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 font-display">
                      {item.feature}
                    </td>
                    <td className="py-4 px-6 text-slate-900 bg-blue-50/30 font-medium">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{item.tium}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-center gap-2.5">
                        <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
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

      {/* ── CTA Banner ── */}
      <section className="py-20 soothing-blue-mesh text-white border-t border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
              Experience the TIUM standard.
            </h2>
            <p className="text-blue-100/80 text-base leading-relaxed">
              Schedule an executive staffing consultation with our Austin leadership team to review your headcount targets.
            </p>
            <div className="pt-2">
              <Button href="/contact?intent=talent" variant="secondary" size="lg" withArrow>
                Start the Conversation
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
