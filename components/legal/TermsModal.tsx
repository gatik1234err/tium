"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, CheckCircle2, ShieldCheck, X, AlertCircle } from "lucide-react";
import type { TermsSettings } from "@/lib/types";

interface TermsModalProps {
  initialSettings?: TermsSettings;
}

export function TermsModal({ initialSettings }: TermsModalProps) {
  const [settings, setSettings] = useState<TermsSettings | null>(initialSettings || null);
  const [isOpen, setIsOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [hasScrolledBottom, setHasScrolledBottom] = useState(false);

  useEffect(() => {
    // If not passed initially, fetch from API
    if (!initialSettings) {
      fetch("/api/legal")
        .then((res) => res.json())
        .then((data) => {
          if (data?.terms) {
            setSettings(data.terms);
            checkTermsConsent(data.terms);
          }
        })
        .catch((err) => console.error("Failed to load terms settings:", err));
    } else {
      checkTermsConsent(initialSettings);
    }

    // Event listener to open modal on-demand
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener("tium_open_terms_modal", handleOpen);

    // Also attach to window for convenient programmatic access
    if (typeof window !== "undefined") {
      (window as unknown as { openTermsModal?: () => void }).openTermsModal = () => setIsOpen(true);
    }

    return () => {
      window.removeEventListener("tium_open_terms_modal", handleOpen);
    };
  }, [initialSettings]);

  const checkTermsConsent = (termsConfig: TermsSettings) => {
    if (!termsConfig.enabled) {
      setIsOpen(false);
      return;
    }

    const acceptedVersion = localStorage.getItem("tium_terms_accepted_version");

    // If modal trigger is first_visit or always, and current version is not accepted
    if (termsConfig.modalTrigger === "first_visit" || termsConfig.modalTrigger === "always") {
      if (acceptedVersion !== termsConfig.version) {
        // Pop out after a brief moment
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  };

  const handleAgree = () => {
    if (!agreed || !settings) return;
    localStorage.setItem("tium_terms_accepted_version", settings.version);
    localStorage.setItem("tium_terms_accepted_date", new Date().toISOString());
    setIsOpen(false);
    window.dispatchEvent(
      new CustomEvent("tium_terms_accepted", { detail: { version: settings.version } })
    );
  };

  const handleDecline = () => {
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden max-h-[90vh] text-slate-800 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="terms-modal-title"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Version {settings.version}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Updated: {settings.lastUpdated}
                </span>
              </div>
              <h2 id="terms-modal-title" className="text-xl font-bold font-display text-slate-900">
                {settings.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {settings.subtitle}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDecline}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable Terms Content */}
        <div
          onScroll={handleScroll}
          className="p-6 overflow-y-auto flex-1 text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed max-h-[460px] bg-slate-50/30"
        >
          <div className="prose prose-sm max-w-none prose-headings:font-display prose-headings:text-slate-900 prose-headings:font-semibold prose-a:text-blue-600">
            {settings.content.split("\n\n").map((block, idx) => {
              if (block.startsWith("### ")) {
                return (
                  <h3 key={idx} className="text-sm font-bold text-slate-900 mt-4 mb-2">
                    {block.replace("### ", "")}
                  </h3>
                );
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={idx} className="list-disc pl-5 space-y-1 text-slate-600 my-2">
                    {block.split("\n").map((item, itemIdx) => (
                      <li key={itemIdx}>{item.replace(/^- /, "")}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-slate-600 my-2">
                  {block}
                </p>
              );
            })}
          </div>

          {!hasScrolledBottom && (
            <p className="text-[11px] text-slate-400 text-center italic pt-2">
              (Scroll down to review full terms)
            </p>
          )}
        </div>

        {/* Modal Footer with Checkbox & Agree Button */}
        <div className="p-6 border-t border-slate-100 bg-white space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
              {settings.checkboxLabel}
            </span>
          </label>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <Link
              href="/terms"
              target="_blank"
              className="text-xs text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1 font-medium order-2 sm:order-1"
            >
              <FileText className="w-3.5 h-3.5" />
              Open Full Terms in New Tab
            </Link>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end order-1 sm:order-2">
              <button
                type="button"
                onClick={handleDecline}
                className="px-4 py-2 text-xs font-medium rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {settings.declineButtonText || "Decline"}
              </button>

              <button
                type="button"
                onClick={handleAgree}
                disabled={!agreed}
                className={`px-5 py-2.5 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all shadow-md ${
                  agreed
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 cursor-pointer"
                    : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {settings.agreeButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
