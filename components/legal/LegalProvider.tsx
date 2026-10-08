"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { CookieConsent } from "./CookieConsent";
import { TermsModal } from "./TermsModal";
import type { CookieSettings, TermsSettings } from "@/lib/types";

interface LegalProviderProps {
  initialCookies?: CookieSettings;
  initialTerms?: TermsSettings;
}

export function LegalProvider({ initialCookies, initialTerms }: LegalProviderProps) {
  const pathname = usePathname();

  // Do not show public cookies or terms modal inside the admin panel
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <CookieConsent initialSettings={initialCookies} />
      <TermsModal initialSettings={initialTerms} />
    </>
  );
}
