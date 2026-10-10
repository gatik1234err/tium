"use client";

import React, { useState, useEffect } from "react";
import { FileText, Save, Check, RefreshCw } from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { PagesData } from "@/lib/types";

export default function AdminPagesEditorPage() {
  const [pages, setPages] = useState<PagesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"home" | "about" | "careers" | "contact">("home");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const loadPages = async () => {
    try {
      const res = await fetch("/api/admin/pages");
      const data = await res.json();
      setPages(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pages) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pages),
      });

      if (!res.ok) throw new Error("Failed");
      setFeedback("Page content updated and published successfully!");
      setTimeout(() => setFeedback(""), 3500);
    } catch {
      alert("Error saving page content.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !pages) {
    return (
      <div className="py-20 text-center text-xs font-mono text-slate-400">
        Loading editable page content...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-500" />
            Website Page Content Editor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update hero headlines, subheads, calls to action, mission statements, and corporate addresses.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={submitting}
          className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Save className="w-4 h-4" />
          {submitting ? "Publishing..." : "Publish Changes"}
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-1 text-xs font-medium">
        {[
          { id: "home", label: "Home Page" },
          { id: "about", label: "About Page" },
          { id: "careers", label: "Careers Header" },
          { id: "contact", label: "Contact Information" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 rounded-t-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-slate-950 text-white font-semibold border-t border-x border-slate-800"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
        {activeTab === "home" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white font-display border-b border-slate-800 pb-2">
              Homepage Hero Section
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Headline Part 1</label>
                <input
                  type="text"
                  value={pages.home.hero.headlinePart1}
                  onChange={(e) =>
                    setPages({
                      ...pages,
                      home: {
                        ...pages.home,
                        hero: { ...pages.home.hero, headlinePart1: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Headline Accent (Blue)</label>
                <input
                  type="text"
                  value={pages.home.hero.headlineAccent}
                  onChange={(e) =>
                    setPages({
                      ...pages,
                      home: {
                        ...pages.home,
                        hero: { ...pages.home.hero, headlineAccent: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-blue-400 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Headline Part 2</label>
                <input
                  type="text"
                  value={pages.home.hero.headlinePart2}
                  onChange={(e) =>
                    setPages({
                      ...pages,
                      home: {
                        ...pages.home,
                        hero: { ...pages.home.hero, headlinePart2: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Hero Description</label>
              <textarea
                rows={3}
                value={pages.home.hero.description}
                onChange={(e) =>
                  setPages({
                    ...pages,
                    home: {
                      ...pages.home,
                      hero: { ...pages.home.hero, description: e.target.value },
                    },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Primary CTA Button</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pages.home.hero.primaryCtaText}
                    onChange={(e) =>
                      setPages({
                        ...pages,
                        home: {
                          ...pages.home,
                          hero: { ...pages.home.hero, primaryCtaText: e.target.value },
                        },
                      })
                    }
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                  <input
                    type="text"
                    value={pages.home.hero.primaryCtaLink}
                    onChange={(e) =>
                      setPages({
                        ...pages,
                        home: {
                          ...pages.home,
                          hero: { ...pages.home.hero, primaryCtaLink: e.target.value },
                        },
                      })
                    }
                    className="w-48 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Secondary CTA Button</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pages.home.hero.secondaryCtaText}
                    onChange={(e) =>
                      setPages({
                        ...pages,
                        home: {
                          ...pages.home,
                          hero: { ...pages.home.hero, secondaryCtaText: e.target.value },
                        },
                      })
                    }
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                  <input
                    type="text"
                    value={pages.home.hero.secondaryCtaLink}
                    onChange={(e) =>
                      setPages({
                        ...pages,
                        home: {
                          ...pages.home,
                          hero: { ...pages.home.hero, secondaryCtaLink: e.target.value },
                        },
                      })
                    }
                    className="w-48 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Hero Image Uploader */}
            <ImageUploadField
              label="Homepage Hero Image"
              description="Displays prominently on the right side of the hero section behind floating candidate cards"
              value={pages.home.hero.imageUrl || ""}
              onChange={(url) =>
                setPages({
                  ...pages,
                  home: {
                    ...pages.home,
                    hero: { ...pages.home.hero, imageUrl: url },
                  },
                })
              }
              aspectHint="Recommended: 16:9 or 4:3 (HD)"
            />

            <h3 className="text-sm font-bold text-white font-display border-b border-slate-800 pb-2 pt-4">
              Homepage Introduction Section
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Intro Eyebrow</label>
                <input
                  type="text"
                  value={pages.home.intro.eyebrow}
                  onChange={(e) =>
                    setPages({
                      ...pages,
                      home: {
                        ...pages.home,
                        intro: { ...pages.home.intro, eyebrow: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Intro Headline</label>
                <input
                  type="text"
                  value={pages.home.intro.headline}
                  onChange={(e) =>
                    setPages({
                      ...pages,
                      home: {
                        ...pages.home,
                        intro: { ...pages.home.intro, headline: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Intro Paragraph</label>
              <textarea
                rows={3}
                value={pages.home.intro.description}
                onChange={(e) =>
                  setPages({
                    ...pages,
                    home: {
                      ...pages.home,
                      intro: { ...pages.home.intro, description: e.target.value },
                    },
                  })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
              />
            </div>

            {/* Intro Image Uploader */}
            <ImageUploadField
              label="Introduction Office / Team Photo"
              description="Displays in the left column of Who We Are with the pulled quote card overlay"
              value={pages.home.intro.imageUrl || ""}
              onChange={(url) =>
                setPages({
                  ...pages,
                  home: {
                    ...pages.home,
                    intro: { ...pages.home.intro, imageUrl: url },
                  },
                })
              }
              aspectHint="Recommended: 4:5 or 1:1"
            />

            <h3 className="text-sm font-bold text-white font-display border-b border-slate-800 pb-2 pt-4">
              Homepage Additional Section Graphics
            </h3>

            <div className="space-y-4">
              <ImageUploadField
                label="About Preview Section Photo"
                description="Displays above the credential numbers on the homepage About preview"
                value={pages.home.aboutPreview?.imageUrl || ""}
                onChange={(url) =>
                  setPages({
                    ...pages,
                    home: {
                      ...pages.home,
                      aboutPreview: { ...(pages.home.aboutPreview || {}), imageUrl: url },
                    },
                  })
                }
                aspectHint="Recommended: 16:9 or 2:1"
              />

              <ImageUploadField
                label="Mission & Vision Section Graphic"
                description="Displays in the dark card of the Vision column on the homepage"
                value={pages.home.missionVision?.imageUrl || ""}
                onChange={(url) =>
                  setPages({
                    ...pages,
                    home: {
                      ...pages.home,
                      missionVision: { ...(pages.home.missionVision || {}), imageUrl: url },
                    },
                  })
                }
                aspectHint="Recommended: 16:9"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ImageUploadField
                  label="Employer CTA Card Graphic"
                  description="Displays atop the For Organizations card"
                  value={pages.home.dualCta.employers.imageUrl || ""}
                  onChange={(url) =>
                    setPages({
                      ...pages,
                      home: {
                        ...pages.home,
                        dualCta: {
                          ...pages.home.dualCta,
                          employers: { ...pages.home.dualCta.employers, imageUrl: url },
                        },
                      },
                    })
                  }
                  aspectHint="Recommended: 16:9"
                />

                <ImageUploadField
                  label="Candidate CTA Card Graphic"
                  description="Displays atop the For Professionals card"
                  value={pages.home.dualCta.candidates.imageUrl || ""}
                  onChange={(url) =>
                    setPages({
                      ...pages,
                      home: {
                        ...pages.home,
                        dualCta: {
                          ...pages.home.dualCta,
                          candidates: { ...pages.home.dualCta.candidates, imageUrl: url },
                        },
                      },
                    })
                  }
                  aspectHint="Recommended: 16:9"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white font-display border-b border-slate-800 pb-2">
              About Page Header & Story
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Header Eyebrow</label>
                <input
                  type="text"
                  value={pages.about.eyebrow}
                  onChange={(e) =>
                    setPages({ ...pages, about: { ...pages.about, eyebrow: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Header Title</label>
                <input
                  type="text"
                  value={pages.about.title}
                  onChange={(e) =>
                    setPages({ ...pages, about: { ...pages.about, title: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Story Headline</label>
              <input
                type="text"
                value={pages.about.storyTitle}
                onChange={(e) =>
                  setPages({ ...pages, about: { ...pages.about, storyTitle: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Story Paragraph 1</label>
              <textarea
                rows={3}
                value={pages.about.storyParagraph1}
                onChange={(e) =>
                  setPages({ ...pages, about: { ...pages.about, storyParagraph1: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Story Paragraph 2</label>
              <textarea
                rows={3}
                value={pages.about.storyParagraph2}
                onChange={(e) =>
                  setPages({ ...pages, about: { ...pages.about, storyParagraph2: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Stat Value</label>
                <input
                  type="text"
                  value={pages.about.statNumber}
                  onChange={(e) =>
                    setPages({ ...pages, about: { ...pages.about, statNumber: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Stat Label</label>
                <input
                  type="text"
                  value={pages.about.statLabel}
                  onChange={(e) =>
                    setPages({ ...pages, about: { ...pages.about, statLabel: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            {/* About Story Image Uploader */}
            <ImageUploadField
              label="Austin HQ / Team Story Photo"
              description="Displays prominently on the left of the About page story alongside the 98.4% SLA card"
              value={pages.about.storyImageUrl || ""}
              onChange={(url) =>
                setPages({
                  ...pages,
                  about: { ...pages.about, storyImageUrl: url },
                })
              }
              aspectHint="Recommended: 4:5 or 1:1"
            />

            <h3 className="text-sm font-bold text-white font-display border-b border-slate-800 pb-2 pt-4">
              Mission & Vision Statements
            </h3>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Mission Statement</label>
              <textarea
                rows={2}
                value={pages.about.missionDesc}
                onChange={(e) =>
                  setPages({ ...pages, about: { ...pages.about, missionDesc: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Vision Statement</label>
              <textarea
                rows={2}
                value={pages.about.visionDesc}
                onChange={(e) =>
                  setPages({ ...pages, about: { ...pages.about, visionDesc: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === "careers" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white font-display border-b border-slate-800 pb-2">
              Careers Page Header & Copy
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Eyebrow</label>
                <input
                  type="text"
                  value={pages.careers.eyebrow}
                  onChange={(e) =>
                    setPages({ ...pages, careers: { ...pages.careers, eyebrow: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={pages.careers.title}
                  onChange={(e) =>
                    setPages({ ...pages, careers: { ...pages.careers, title: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Description</label>
              <textarea
                rows={3}
                value={pages.careers.description}
                onChange={(e) =>
                  setPages({ ...pages, careers: { ...pages.careers, description: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Search Placeholder</label>
                <input
                  type="text"
                  value={pages.careers.searchPlaceholder}
                  onChange={(e) =>
                    setPages({
                      ...pages,
                      careers: { ...pages.careers, searchPlaceholder: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Empty Search Message</label>
                <input
                  type="text"
                  value={pages.careers.noResultsText}
                  onChange={(e) =>
                    setPages({
                      ...pages,
                      careers: { ...pages.careers, noResultsText: e.target.value },
                    })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white font-display border-b border-slate-800 pb-2">
              Corporate Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={pages.contact.phone}
                  onChange={(e) =>
                    setPages({ ...pages, contact: { ...pages.contact, phone: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Contact Email</label>
                <input
                  type="text"
                  value={pages.contact.email}
                  onChange={(e) =>
                    setPages({ ...pages, contact: { ...pages.contact, email: e.target.value } })
                  }
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">HQ Physical Address</label>
              <input
                type="text"
                value={pages.contact.address}
                onChange={(e) =>
                  setPages({ ...pages, contact: { ...pages.contact, address: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Operating Hours</label>
              <input
                type="text"
                value={pages.contact.hours}
                onChange={(e) =>
                  setPages({ ...pages, contact: { ...pages.contact, hours: e.target.value } })
                }
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
              />
            </div>

            {/* Contact Office Image Uploader */}
            <ImageUploadField
              label="Austin HQ / Office Environment Photo"
              description="Displays in the right sidebar above headquarters coordinates on the Contact page"
              value={pages.contact.officeImageUrl || ""}
              onChange={(url) =>
                setPages({
                  ...pages,
                  contact: { ...pages.contact, officeImageUrl: url },
                })
              }
              aspectHint="Recommended: 16:9 or 2:1"
            />
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {submitting ? "Publishing..." : "Save & Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
