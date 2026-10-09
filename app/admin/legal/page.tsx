"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Cookie,
  FileText,
  Check,
  Save,
  Eye,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import type { LegalData } from "@/lib/types";

export default function AdminLegalPage() {
  const [legal, setLegal] = useState<LegalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"terms" | "cookies" | "privacy">("terms");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const loadLegal = async () => {
    try {
      const res = await fetch("/api/admin/legal");
      const data = await res.json();
      setLegal(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLegal();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!legal) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/legal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(legal),
      });

      if (!res.ok) throw new Error("Failed to save legal settings");
      setFeedback("Legal, cookies, and terms settings updated successfully!");
      setTimeout(() => setFeedback(""), 3500);
    } catch {
      alert("Error saving settings.");
    } finally {
      setSubmitting(false);
    }
  };

  const testPopoutModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tium_open_terms_modal"));
    }
  };

  const testCookieBanner = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("tium_open_cookie_preferences"));
    }
  };

  if (loading || !legal) {
    return (
      <div className="py-20 text-center text-xs font-mono text-slate-400">
        Loading compliance and terms configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-blue-500" />
            Compliance, Cookies & Terms Popout
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure the user cookie consent banner, popout modal, version governance, and legal agreements.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0 self-start sm:self-auto">
          {activeTab === "terms" && (
            <>
              <a
                href="/?preview_terms=true"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                Test Popout on Live Site ↗
              </a>
            </>
          )}
          {activeTab === "cookies" && (
            <button
              type="button"
              onClick={testCookieBanner}
              className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              Preview Cookie Modal
            </button>
          )}
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-1 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("terms")}
          className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "terms"
              ? "bg-slate-950 text-white font-semibold border-t border-x border-slate-800"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FileText className="w-4 h-4 text-blue-400" />
          Terms & Conditions Popout
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("cookies")}
          className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "cookies"
              ? "bg-slate-950 text-white font-semibold border-t border-x border-slate-800"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Cookie className="w-4 h-4 text-blue-400" />
          Cookie Consent Banner
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("privacy")}
          className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === "privacy"
              ? "bg-slate-950 text-white font-semibold border-t border-x border-slate-800"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-blue-400" />
          Privacy Policy
        </button>
      </div>

      {/* ── Tab 1: Terms & Conditions Popout Editor ── */}
      {activeTab === "terms" && (
        <form onSubmit={handleSave} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          {/* Version Notice Alert */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3 text-slate-300">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-white">
                Version Governance & Re-Agreement Engine
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                When you make modifications to the Terms & Conditions and increment the{" "}
                <strong className="text-white font-mono">Version</strong> (e.g. from{" "}
                <span className="text-blue-400">{legal.terms.version}</span> to a higher number like{" "}
                <span className="text-emerald-400">2.2</span>), all previous visitors who already agreed will automatically see the Popout Modal again on their next visit to re-affirm agreement!
              </p>
            </div>
          </div>

          {/* Main Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="block font-semibold text-white">Enable Popout Modal</span>
                <span className="text-[11px] text-slate-400">Display terms modal to visitors</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={legal.terms.enabled}
                  onChange={(e) =>
                    setLegal({
                      ...legal,
                      terms: { ...legal.terms, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                Version Identifier <span className="text-blue-500">*</span>
              </label>
              <input
                type="text"
                required
                value={legal.terms.version}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    terms: { ...legal.terms, version: e.target.value },
                  })
                }
                placeholder="e.g. 2.1"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">
                Last Updated Date
              </label>
              <input
                type="text"
                value={legal.terms.lastUpdated}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    terms: { ...legal.terms, lastUpdated: e.target.value },
                  })
                }
                placeholder="e.g. October 2026"
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Modal Trigger Timing</label>
              <select
                value={legal.terms.modalTrigger}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    terms: {
                      ...legal.terms,
                      modalTrigger: e.target.value as LegalData["terms"]["modalTrigger"],
                    },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
              >
                <option value="first_visit">First Visit (Until agreed, then saved)</option>
                <option value="always">Always (Every new session)</option>
                <option value="form_submission">On Form Submission & Link Only</option>
                <option value="disabled">Disabled (Manual link only)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Modal Title</label>
              <input
                type="text"
                value={legal.terms.title}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    terms: { ...legal.terms, title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Modal Subtitle / Notice</label>
            <input
              type="text"
              value={legal.terms.subtitle}
              onChange={(e) =>
                setLegal({
                  ...legal,
                  terms: { ...legal.terms, subtitle: e.target.value },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-semibold text-white">Checkbox & Button Labels</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-slate-400 font-semibold mb-1">
                  Required Agreement Checkbox Label
                </label>
                <input
                  type="text"
                  value={legal.terms.checkboxLabel}
                  onChange={(e) =>
                    setLegal({
                      ...legal,
                      terms: { ...legal.terms, checkboxLabel: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Agree Button Text</label>
                <input
                  type="text"
                  value={legal.terms.agreeButtonText}
                  onChange={(e) =>
                    setLegal({
                      ...legal,
                      terms: { ...legal.terms, agreeButtonText: e.target.value },
                    })
                  }
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* Full Terms Markdown Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-400 font-semibold">
                Full Terms & Conditions Text Content (Markdown Supported)
              </label>
              <span className="text-[10px] text-slate-500 font-mono">Use ### for section titles</span>
            </div>
            <textarea
              rows={14}
              value={legal.terms.content}
              onChange={(e) =>
                setLegal({
                  ...legal,
                  terms: { ...legal.terms, content: e.target.value },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white font-mono text-xs leading-relaxed resize-y"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={testPopoutModal}
              className="px-4 py-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
            >
              Test Popout Now
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {submitting ? "Saving..." : "Save & Update Terms"}
            </button>
          </div>
        </form>
      )}

      {/* ── Tab 2: Cookie Consent Banner Editor ── */}
      {activeTab === "cookies" && (
        <form onSubmit={handleSave} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="block font-semibold text-white">Enable Cookie Banner</span>
              <span className="text-[11px] text-slate-400">Display floating cookie banner to visitors</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={legal.cookies.enabled}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    cookies: { ...legal.cookies, enabled: e.target.checked },
                  })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Banner Title</label>
              <input
                type="text"
                value={legal.cookies.title}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    cookies: { ...legal.cookies, title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Privacy Policy URL</label>
              <input
                type="text"
                value={legal.cookies.policyUrl}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    cookies: { ...legal.cookies, policyUrl: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Banner Description Message</label>
            <textarea
              rows={3}
              value={legal.cookies.message}
              onChange={(e) =>
                setLegal({
                  ...legal,
                  cookies: { ...legal.cookies, message: e.target.value },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Accept Button Text</label>
              <input
                type="text"
                value={legal.cookies.acceptAllText}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    cookies: { ...legal.cookies, acceptAllText: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Decline Button Text</label>
              <input
                type="text"
                value={legal.cookies.declineText}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    cookies: { ...legal.cookies, declineText: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Preferences Button Text</label>
              <input
                type="text"
                value={legal.cookies.settingsText}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    cookies: { ...legal.cookies, settingsText: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          {/* Live Mock Banner Preview */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="font-semibold text-slate-400 text-[11px] uppercase font-mono">
              Live Visitor Banner Preview:
            </span>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white">{legal.cookies.title}</h5>
                  <p className="text-[11px] text-slate-300 max-w-xl">{legal.cookies.message}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 text-[11px] rounded bg-slate-800 text-slate-300">
                  {legal.cookies.declineText}
                </span>
                <span className="px-3 py-1 text-[11px] font-semibold rounded bg-blue-600 text-white">
                  {legal.cookies.acceptAllText}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {submitting ? "Saving..." : "Save Cookie Settings"}
            </button>
          </div>
        </form>
      )}

      {/* ── Tab 3: Privacy Policy Editor ── */}
      {activeTab === "privacy" && (
        <form onSubmit={handleSave} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Document Title</label>
              <input
                type="text"
                value={legal.privacy.title}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    privacy: { ...legal.privacy, title: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Last Updated</label>
              <input
                type="text"
                value={legal.privacy.lastUpdated}
                onChange={(e) =>
                  setLegal({
                    ...legal,
                    privacy: { ...legal.privacy, lastUpdated: e.target.value },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Introductory Statement</label>
            <textarea
              rows={3}
              value={legal.privacy.intro}
              onChange={(e) =>
                setLegal({
                  ...legal,
                  privacy: { ...legal.privacy, intro: e.target.value },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Policy Sections</h4>
            {legal.privacy.sections.map((sec, idx) => (
              <div key={sec.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Section Title</label>
                  <input
                    type="text"
                    value={sec.title}
                    onChange={(e) => {
                      const updatedSections = [...legal.privacy.sections];
                      updatedSections[idx].title = e.target.value;
                      setLegal({
                        ...legal,
                        privacy: { ...legal.privacy, sections: updatedSections },
                      });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Section Content</label>
                  <textarea
                    rows={3}
                    value={sec.content}
                    onChange={(e) => {
                      const updatedSections = [...legal.privacy.sections];
                      updatedSections[idx].content = e.target.value;
                      setLegal({
                        ...legal,
                        privacy: { ...legal.privacy, sections: updatedSections },
                      });
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white resize-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {submitting ? "Saving..." : "Save Privacy Policy"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
