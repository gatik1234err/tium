import React from "react";
import { Container } from "@/components/ui/Container";
import { Sparkles, Shield, Compass } from "lucide-react";

export function MissionVisionSection() {
  return (
    <section className="py-0 soothing-blue-mesh border-b border-blue-900/50 overflow-hidden relative">
      {/* Ambient decorative glow */}
      <div className="absolute top-0 right-1/3 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 relative z-10">
        {/* Mission */}
        <div className="py-20 lg:py-24 lg:pr-16 space-y-6">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-sky-300 font-mono">
              Our Mission
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white font-display leading-[1.18]">
            Empower businesses with the right talent and individuals with the right opportunities.
          </h2>

          <div className="h-0.5 w-16 bg-gradient-to-r from-sky-400 to-transparent" />

          <p className="text-blue-100/80 leading-relaxed text-base sm:text-lg">
            We exist to build genuine bridges between ambitious enterprises and exceptional professionals.
            When organizations align with the right human potential, progress is accelerated and
            transformational outcomes become reality.
          </p>

          {/* Pillars */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { label: "Integrity", icon: Shield },
              { label: "Transparency", icon: Compass },
              { label: "Excellence", icon: Sparkles },
            ].map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="soothing-blue-card soothing-blue-card-hover rounded-xl p-4 text-center group cursor-default"
              >
                <Icon className="w-4 h-4 mx-auto mb-2 text-sky-400 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-semibold text-white tracking-wider uppercase">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="py-20 lg:py-24 lg:pl-16 space-y-6">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-sky-300 font-mono">
              Our Vision
            </p>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white font-display leading-[1.18]">
            A future where talent and opportunity converge seamlessly.
          </h2>

          <div className="h-0.5 w-16 bg-gradient-to-r from-blue-400 to-transparent" />

          <p className="text-blue-100/80 leading-relaxed text-base sm:text-lg">
            We envision a workforce ecosystem free from friction and mismatched expectations —
            powered by smart technology, authentic transparency, and trusted advisory delivered
            by practitioners who have done the work themselves.
          </p>

          {/* Vision Media Placeholder */}
          <div className="img-placeholder-dark rounded-xl h-44 relative overflow-hidden mt-6 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-sm font-medium text-sky-200/70">Aspirational Workforce Ecosystem</p>
              <p className="text-xs text-sky-200/40 mt-1 font-mono">High-Tech & Executive Leadership</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
