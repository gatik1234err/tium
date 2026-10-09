"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FileText, CheckCircle2, ShieldCheck, X } from "lucide-react";
import type { TermsSettings } from "@/lib/types";

const STORAGE_KEY = "tium_terms_accepted_version";
const STORAGE_DATE_KEY = "tium_terms_accepted_date";

interface TermsModalProps {
  initialSettings?: TermsSettings;
}

export function TermsModal({ initialSettings }: TermsModalProps) {
  const [settings, setSettings] = useState<TermsSettings | null>(initialSettings || null);
  const [isOpen, setIsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [hasScrolledBottom, setHasScrolledBottom] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check cache and evaluate if modal should appear
  const checkCacheAndDisplay = (termsConfig: TermsSettings) => {
    if (!termsConfig.enabled) {
      setIsOpen(false);
      return;
    }

    try {
      // Check query param override for testing
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("preview_terms") === "true" || urlParams.get("terms_test") === "true") {
          setTimeout(() => setIsOpen(true), 150);
          return;
        }
      }

      const cachedVersion = localStorage.getItem(STORAGE_KEY);
      const cookieMatches = document.cookie.includes(
        `tium_terms_accepted_v${encodeURIComponent(termsConfig.version)}=true`
      );

      const isCached = cachedVersion === termsConfig.version || cookieMatches;

      if (termsConfig.modalTrigger === "always") {
        // Show once per browser session unless already agreed in this session
        const sessionAgreed = sessionStorage.getItem("tium_terms_session_agreed");
        if (sessionAgreed !== termsConfig.version) {
          setTimeout(() => setIsOpen(true), 200);
        }
      } else if (termsConfig.modalTrigger === "first_visit" || !termsConfig.modalTrigger) {
        // Standard first visit: if not cached or version updated, pop out!
        if (!isCached) {
          setTimeout(() => setIsOpen(true), 200);
        }
      }
    } catch {
      // Fallback if localStorage is disabled
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (!initialSettings) {
      fetch("/api/legal")
        .then((res) => res.json())
        .then((data) => {
          if (data?.terms) {
            setSettings(data.terms);
            checkCacheAndDisplay(data.terms);
          }
        })
        .catch((err) => console.error("Failed to load terms:", err));
    } else {
      checkCacheAndDisplay(initialSettings);
    }

    // Event listener to open modal on-demand (e.g. from footer link or admin preview)
    const handleOpen = () => {
      setIsOpen(true);
      setAgreed(false);
    };

    // Event listener to reset cache and trigger modal
    const handleResetCache = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_DATE_KEY);
        sessionStorage.removeItem("tium_terms_session_agreed");
        document.cookie = `tium_terms_accepted_v${encodeURIComponent(settings?.version || "")}=; max-age=0; path=/;`;
      } catch {
        // ignore
      }
      setAgreed(false);
      setIsOpen(true);
    };

    window.addEventListener("tium_open_terms_modal", handleOpen);
    window.addEventListener("tium_reset_terms_cache", handleResetCache);

    if (typeof window !== "undefined") {
      (window as unknown as { openTermsModal?: () => void }).openTermsModal = handleOpen;
      (window as unknown as { resetTermsCache?: () => void }).resetTermsCache = handleResetCache;
    }

    return () => {
      window.removeEventListener("tium_open_terms_modal", handleOpen);
      window.removeEventListener("tium_reset_terms_cache", handleResetCache);
    };
  }, [initialSettings, settings?.version]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const handleAgree = () => {
    if (!agreed || !settings) return;

    try {
      // 1. Save in localStorage cache
      localStorage.setItem(STORAGE_KEY, settings.version);
      localStorage.setItem(STORAGE_DATE_KEY, new Date().toISOString());

      // 2. Save in sessionStorage cache
      sessionStorage.setItem("tium_terms_session_agreed", settings.version);

      // 3. Save in cookie cache (1 year persistence)
      document.cookie = `tium_terms_accepted_v${encodeURIComponent(
        settings.version
      )}=true; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {
      console.warn("Storage write error:", e);
    }

    setIsOpen(false);

    // Notify listeners
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("tium_terms_accepted", { detail: { version: settings.version } })
      );
    }
  };

  const handleDecline = () => {
    // Dismiss for the current session without caching permanent acceptance
    try {
      sessionStorage.setItem("tium_terms_session_declined", "true");
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      setHasScrolledBottom(true);
    }
  };

  if (!isOpen || !settings || !settings.enabled) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[92vh] sm:max-h-[88vh] text-slate-800 transition-all duration-300 animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-slate-50/80 to-indigo-50/70 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded border border-blue-200">
                  Version {settings.version}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Updated: {settings.lastUpdated}
                </span>
                <span className="text-[10px] text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Compliance Required
                </span>
              </div>
              <h2 id="terms-modal-title" className="text-lg sm:text-xl font-bold font-display text-slate-900 leading-tight">
                {settings.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {settings.subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDecline}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200/50 transition-colors"
            aria-label="Decline and close"
            title="Decline and close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable Terms Content */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="p-5 sm:p-6 overflow-y-auto flex-1 text-xs sm:text-sm text-slate-600 space-y-3.5 leading-relaxed max-h-[420px] bg-slate-50/40"
        >
          <div className="prose prose-sm max-w-none text-slate-700">
            {settings.content.split("\n\n").map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-sm sm:text-base font-bold text-slate-900 mt-4 mb-2 font-display">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1.5 text-slate-600 my-2">
                    {block.split("\n").map((item, itemIdx) => (
                      <li key={itemIdx}>{item.replace(/^- /, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-slate-600 my-2 leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          {!hasScrolledBottom && (
            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-400 font-mono italic bg-white/80 px-3 py-1 rounded-full border border-slate-200">
                ↓ Scroll to review full terms before agreeing
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer with Agreement Checkbox & Buttons */}
        <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group select-none p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 transition-colors">
            <input
              type="checkbox"
              id="terms-agreement-checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
            />
            <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 leading-snug">
              {settings.checkboxLabel}
            </span>
          </label>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <Link
              href="/terms"
              target="_blank"
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 font-medium justify-center sm:justify-start"
            >
              <FileText className="w-3.5 h-3.5" />
              Open Terms in Full Page ↗
            </Link>

            <div className="flex items-center gap-2.5 justify-end">
              <button
                type="button"
                onClick={handleDecline}
                className="px-4 py-2 text-xs font-medium rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                {settings.declineButtonText || "Decline"}
              </button>

              <button
                type="button"
                onClick={handleAgree}
                disabled={!agreed}
                className={`px-5 py-2.5 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md ${
                  agreed
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 cursor-pointer scale-[1.02] active:scale-[0.98]"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {settings.agreeButtonText || "I Agree & Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
