import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getLegal, getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const legal = await getLegal();
  return {
    title: `${legal.privacy.title} | TIUM Staffing`,
    description: "Privacy Policy for TIUM Staffing LLC. Learn how we safeguard employer confidential information and candidate personal data.",
  };
}

export default async function PrivacyPage() {
  const legal = await getLegal();
  const settings = await getSettings();
  const { privacy } = legal;

  return (
    <div className="pt-16 bg-white min-h-screen">
      {/* ── Page Header ── */}
      <section className="py-20 border-b border-slate-100 bg-slate-50">
        <Container size="narrow">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            Legal & Compliance
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display mb-4">
            {privacy.title}
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last Updated: {privacy.lastUpdated} • {settings.companyName}
          </p>
        </Container>
      </section>

      {/* ── Document Content ── */}
      <section className="py-16">
        <Container size="narrow" className="space-y-10 text-slate-600 text-sm leading-relaxed">
          {privacy.intro && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
              <p>{privacy.intro}</p>
            </div>
          )}

          <div className="space-y-8">
            {privacy.sections.map((sec) => (
              <div key={sec.id} className="space-y-3">
                <h2 className="text-xl font-bold text-slate-900 font-display">
                  {sec.title}
                </h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 font-display mb-3">
              Candidate Rights & Inquiries
            </h2>
            <p className="mb-4">
              Under applicable United States privacy laws (including the Texas Data Privacy and Security Act), candidates and clients have the right to request access to, correction of, or deletion of their personal information.
            </p>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1.5">
              <p className="font-semibold text-slate-900">{settings.companyName} — Privacy & Legal</p>
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
