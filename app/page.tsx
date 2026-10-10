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
import { getPages, getServices, getIndustries } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [pages, services, industries] = await Promise.all([
    getPages(),
    getServices(),
    getIndustries(),
  ]);

  return (
    <>
      {/* 1. Hero */}
      <Hero content={pages?.home?.hero} />

      {/* 2. Trust / Industry Strip */}
      <TrustBar />

      {/* 3. Introduction */}
      <Introduction content={pages?.home?.intro} />

      {/* 4. About Preview */}
      <AboutPreview content={pages?.home?.aboutPreview} />

      {/* 5. Services Interactive */}
      <ServicesSection services={services} />

      {/* 6. Industries */}
      <IndustriesSection industries={industries} />

      {/* 7. Why TIUM */}
      <WhyTiumSection />

      {/* 8. Mission & Vision */}
      <MissionVisionSection content={pages?.home?.missionVision} />

      {/* 9. Values */}
      <ValuesSection />

      {/* 10. Employer / Candidate Dual CTA */}
      <DualCtaSection content={pages?.home?.dualCta} />
    </>
  );
}
