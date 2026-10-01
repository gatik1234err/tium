import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | TIUM Staffing",
  description:
    "Privacy Policy for TIUM Staffing LLC. Learn how we safeguard employer confidential information and candidate personal data.",
};

export default function PrivacyPage() {
  const lastUpdated = "September 2026";

  return (
    <div className="pt-16 bg-white">
      {/* ── Page Header ── */}
      <section className="py-20 border-b border-slate-100 bg-slate-50">
        <Container size="narrow">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 font-mono mb-4">
            Legal & Compliance
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-display mb-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 font-mono">
            Last Updated: {lastUpdated} • TIUM Staffing LLC
          </p>
        </Container>
      </section>

      {/* ── Document Content ── */}
      <section className="py-16">
        <Container size="narrow" className="space-y-10 text-slate-600 text-sm leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-display">1. Introduction</h2>
            <p>
              TIUM Staffing LLC (&quot;TIUM&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
              respects your privacy and is committed to protecting personal information collected
              from website visitors, employer clients, and job candidates. This Privacy Policy
              describes how we collect, process, maintain, and disclose information gathered
              through our website (https://tiumtech.com) and associated workforce advisory services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              2. Information We Collect
            </h2>
            <p>We may collect information directly from you in several contexts:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>
                <strong className="text-slate-900">Employer & Client Inquiries:</strong> Contact name, corporate email address,
                phone number, organization name, hiring specifications, and project scope details.
              </li>
              <li>
                <strong className="text-slate-900">Candidate Information:</strong> Resumes, employment history, educational
                credentials, professional licenses, certifications, location preferences, and
                compensation requirements.
              </li>
              <li>
                <strong className="text-slate-900">Automated Technical Data:</strong> IP addresses, browser types, operating
                system metadata, and browsing actions gathered via standard server logs.
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              3. Use of Personal Information
            </h2>
            <p>TIUM uses collected data strictly for legitimate business purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li>Evaluating candidate suitability for specific open positions.</li>
              <li>Facilitating employer recruitment and staffing agreements.</li>
              <li>Communicating status updates, interview schedules, and placement offers.</li>
              <li>Complying with applicable federal, state, and local employment laws.</li>
              <li>Enhancing website security and optimizing user experience.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              4. Confidentiality & Third-Party Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade your personal information. Candidate information is
              only shared with prospective employers with candidate authorization. Employer search
              scopes and proprietary company data are safeguarded under non-disclosure standards.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              5. Candidate Rights & Inquiries
            </h2>
            <p>
              Under applicable United States state privacy laws (including the Texas Data Privacy
              and Security Act), candidates and clients have the right to request access to,
              correction of, or deletion of their personal information.
            </p>
            <p>
              To exercise these rights, please contact our Compliance Officer at:
            </p>
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1.5">
              <p className="font-semibold text-slate-900">TIUM Staffing LLC — Privacy & Legal</p>
              <p>5900 Balcone Dr STE 100, Austin, TX 78731</p>
              <p>Email: <a href="mailto:support@tiumtech.com" className="text-blue-600 underline">support@tiumtech.com</a></p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
