import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="soothing-blue-mesh text-slate-300 border-t border-blue-900/60 relative overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top section */}
      <div className="border-b border-white/10 relative z-10">
        <Container className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="lg:col-span-4 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-white flex items-center justify-center shadow-sm">
                  <span className="text-blue-950 font-bold font-display text-lg">T</span>
                </div>
                <span className="text-2xl font-bold text-white font-display">TIUM</span>
              </Link>
              <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs">
                Connecting exceptional talent with exceptional organizations. Workforce solutions built for velocity, precision, and lasting impact.
              </p>
              <div className="space-y-2.5 text-sm text-blue-100/80">
                <a href="tel:+13075290201" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                  +1 (307) 529 0201
                </a>
                <a href="mailto:support@tiumtech.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  support@tiumtech.com
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>5900 Balcone Dr STE 100<br />Austin, TX 78731</span>
                </div>
              </div>
            </div>

            {/* Links columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5 font-mono">Company</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    ["About Us", "/about"],
                    ["Why TIUM", "/why-tium"],
                    ["Careers", "/careers"],
                    ["Contact", "/contact"],
                    ["Privacy", "/privacy"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="text-blue-100/70 hover:text-white transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5 font-mono">Services</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    ["RPO", "/services/rpo"],
                    ["Contingent Staffing", "/services/contingent-staffing"],
                    ["Direct Hire", "/services/direct-hire"],
                    ["Contract Hire", "/services/contract-hire"],
                    ["Lead Generation", "/services/lead-generation"],
                    ["Candidate Sourcing", "/services/candidate-sourcing"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="text-blue-100/70 hover:text-white transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-[0.18em] uppercase text-white mb-5 font-mono">Industries</h4>
                <ul className="space-y-3 text-sm">
                  {[
                    ["Information Technology", "/industries/technology"],
                    ["Healthcare", "/industries/healthcare"],
                    ["Automobiles & EV", "/industries/automobiles"],
                    ["Oil & Gas", "/industries/oil-gas"],
                    ["Aeronautics", "/industries/aeronautics"],
                    ["Management", "/industries/management"],
                  ].map(([label, href]) => (
                    <li key={href}>
                      <Link href={href} className="text-blue-100/70 hover:text-white transition-colors">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/30 backdrop-blur-sm border-t border-white/5 relative z-10">
        <Container className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/60 font-mono">
          <p>© 2026 TIUM Staffing LLC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Support</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
