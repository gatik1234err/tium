import React from "react";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { Introduction } from "@/components/home/Introduction";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServicesSection } from "@/components/home/ServicesSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { WhyTiumSection } from "@/components/home/WhyTiumSection";
import { MissionVisionSection } from "@/components/home/MissionVisionSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { DualCtaSection } from "@/components/home/DualCtaSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trust / Industry Strip */}
      <TrustBar />

      {/* 3. Introduction */}
      <Introduction />

      {/* 4. About Preview */}
      <AboutPreview />

      {/* 5. Services Interactive */}
      <ServicesSection />

      {/* 6. Industries */}
      <IndustriesSection />

      {/* 7. Why TIUM */}
      <WhyTiumSection />

      {/* 8. Mission & Vision */}
      <MissionVisionSection />

      {/* 9. Values */}
      <ValuesSection />

      {/* 10. Employer / Candidate Dual CTA */}
      <DualCtaSection />
    </>
  );
}
