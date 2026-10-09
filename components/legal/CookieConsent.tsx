"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Shield, Settings2, Check } from "lucide-react";
import type { CookieSettings } from "@/lib/types";

interface CookieConsentProps {
  initialSettings?: CookieSettings;
}

export function CookieConsent({ initialSettings }: CookieConsentProps) {
  const [settings, setSettings] = useState<CookieSettings | null>(initialSettings || null);
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    // Fetch legal settings if not provided
    if (!initialSettings) {
      fetch("/api/legal")
        .then((res) => res.json())
        .then((data) => {
          if (data?.cookies) {
            setSettings(data.cookies);
            checkConsent(data.cookies);
          }
        })
        .catch((err) => console.error("Failed to load cookie settings:", err));
    } else {
      checkConsent(initialSettings);
    }

    // Listen for custom event to reopen preferences (e.g. from footer link)
    const handleReopen = () => {
      setVisible(true);
      setShowPreferences(true);
    };
    window.addEventListener("tium_open_cookie_preferences", handleReopen);
    return () => window.removeEventListener("tium_open_cookie_preferences", handleReopen);
  }, [initialSettings]);

  const checkConsent = (cookieConfig: CookieSettings) => {
    if (!cookieConfig.enabled) {
      setVisible(false);
      return;
    }
    const saved = localStorage.getItem("tium_cookie_consent");
    if (!saved) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setAnalyticsAllowed(parsed.analytics ?? true);
        setMarketingAllowed(parsed.marketing ?? false);
      } catch {
        // invalid json
      }
    }
  };

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem("tium_cookie_consent", JSON.stringify(consent));
      document.cookie = "tium_cookie_consent=all; path=/; max-age=31536000; SameSite=Lax";
    } catch {
      // ignore
    }
    setVisible(false);
    setShowPreferences(false);
  };

  const handleDecline = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem("tium_cookie_consent", JSON.stringify(consent));
      document.cookie = "tium_cookie_consent=necessary; path=/; max-age=31536000; SameSite=Lax";
    } catch {
      // ignore
    }
    setVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    const consent = {
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem("tium_cookie_consent", JSON.stringify(consent));
      document.cookie = `tium_cookie_consent=${analyticsAllowed ? "analytics" : ""}_${marketingAllowed ? "marketing" : ""}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }
    setVisible(false);
    setShowPreferences(false);
  };

  const openTermsModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tium_open_terms_modal"));
    }
  };

  if (!visible || !settings || !settings.enabled) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-5 sm:p-6 text-white transition-all duration-300">
          {!showPreferences ? (
            /* Main Banner */
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 mt-0.5 text-blue-400">
                  <Cookie className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-semibold text-base font-display text-white flex items-center gap-2">
                    {settings.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {settings.message}{" "}
                    <Link
                      href={settings.policyUrl || "/privacy"}
                      className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors"
                    >
                      Privacy Policy
                    </Link>{" "}
                    &bull;{" "}
                    <button
                      type="button"
                      onClick={openTermsModal}
                      className="text-blue-400 underline underline-offset-2 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      Terms & Conditions
                    </button>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto shrink-0 justify-end">
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  {settings.settingsText || "Preferences"}
                </button>
                <button
                  type="button"
                  onClick={handleDecline}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-colors"
                >
                  {settings.declineText}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  {settings.acceptAllText}
                </button>
              </div>
            </div>
          ) : (
            /* Preferences Drawer */
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold text-base font-display text-white">
                    Manage Cookie Preferences
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Essential */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Strictly Necessary</span>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      Always Active
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Essential for site security, session state, and workforce service forms.
                  </p>
                </div>

                {/* Analytics */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Analytics & Metrics</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={analyticsAllowed}
                        onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Helps us evaluate recruiter performance and recruitment pipeline response times.
                  </p>
                </div>

                {/* Marketing */}
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Marketing & Outreach</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingAllowed}
                        onChange={(e) => setMarketingAllowed(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Used to present relevant career opportunities and staffing announcements.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-4 py-1.5 text-xs font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-500 shadow transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
