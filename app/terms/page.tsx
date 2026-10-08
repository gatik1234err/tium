import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getLegal, getSettings } from "@/lib/store";
import { ShieldCheck, Printer, ArrowRight, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const legal = await getLegal();
  return {
    title: `${legal.terms.title} | TIUM Staffing`,
    description: `Official Terms and Conditions of Service for TIUM Staffing LLC. Version ${legal.terms.version}.`,
  };
}

export default async function TermsPage() {
  const legal = await getLegal();
  const settings = await getSettings();
  const { terms } = legal;

  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* ── Page Header ── */}
      <section className="py-20 border-b border-slate-100 bg-slate-50/80">
        <Container size="narrow">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono">
              Legal & Compliance
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
              Version {terms.version}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display mb-4">
            {terms.title}
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last Updated: {terms.lastUpdated} • {settings.companyName}
          </p>
        </Container>
      </section>

      {/* ── Document Content ── */}
      <section className="py-16">
        <Container size="narrow" className="space-y-10 text-slate-600 text-sm leading-relaxed">
          {/* Quick Notice Card */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-semibold text-slate-900 font-display">
                Binding Legal Agreement
              </p>
              <p className="text-slate-600 leading-relaxed">
                By accessing TIUM Staffing websites, consulting services, candidate portals, or submitting workforce requirements, you explicitly agree to these terms.
              </p>
            </div>
          </div>

          {/* Formatted Terms Body */}
          <div className="space-y-8">
            {terms.content.split("\n\n").map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <div key={idx} className="pt-2 border-t border-slate-100 first:border-t-0">
                    <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
                      {block.replace("### ", "")}
                    </h2>
                  </div>
                );
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-2 text-slate-600">
                    {block.split("\n").map((item, itemIdx) => (
                      <li key={itemIdx}>{item.replace(/^- /, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-slate-600 leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Contact & Governance Block */}
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-base font-bold text-slate-900 font-display mb-3">
              Questions & Legal Notices
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              All formal inquiries regarding these Terms and Conditions should be directed to our Legal & Compliance Counsel:
            </p>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1.5">
              <p className="font-semibold text-slate-900">{settings.companyName} — Legal Compliance</p>
              <p>{settings.address}</p>
              <p>Email: <a href={`mailto:${settings.email}`} className="text-blue-600 underline">{settings.email}</a></p>
              <p>Phone: <a href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`} className="text-blue-600 underline">{settings.phone}</a></p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
