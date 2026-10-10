"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Loader2,
  FolderOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface MediaItem {
  filename: string;
  url: string;
  size: number;
  updatedAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [assigningTo, setAssigningTo] = useState<{ [filename: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadMedia = async () => {
    try {
      const res = await fetch("/api/admin/upload");
      const data = await res.json();
      if (data.files) {
        setMediaList(data.files);
      }
    } catch (err) {
      console.error("Failed to load media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setMessage("");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Upload failed");
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setUploading(false);
    setMessage("Media uploaded successfully!");
    setTimeout(() => setMessage(""), 3000);
    if (fileInputRef.current) fileInputRef.current.value = "";
    loadMedia();
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const res = await fetch(`/api/admin/upload?filename=${encodeURIComponent(filename)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMediaList((prev) => prev.filter((m) => m.filename !== filename));
        setMessage("Image deleted.");
        setTimeout(() => setMessage(""), 2500);
      }
    } catch {
      alert("Failed to delete file.");
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Quick assign helper
  const handleAssignSlot = async (url: string, slotKey: string) => {
    if (!slotKey) return;

    try {
      // 1. Fetch current pages
      const res = await fetch("/api/admin/pages");
      const pages = await res.json();

      if (slotKey === "hero") {
        pages.home.hero.imageUrl = url;
      } else if (slotKey === "intro") {
        pages.home.intro.imageUrl = url;
      } else if (slotKey === "aboutPreview") {
        pages.home.aboutPreview = { ...(pages.home.aboutPreview || {}), imageUrl: url };
      } else if (slotKey === "missionVision") {
        pages.home.missionVision = { ...(pages.home.missionVision || {}), imageUrl: url };
      } else if (slotKey === "dualCtaEmployer") {
        pages.home.dualCta.employers.imageUrl = url;
      } else if (slotKey === "dualCtaCandidate") {
        pages.home.dualCta.candidates.imageUrl = url;
      } else if (slotKey === "aboutStory") {
        pages.about.storyImageUrl = url;
      } else if (slotKey === "contactOffice") {
        pages.contact.officeImageUrl = url;
      }

      await fetch("/api/admin/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pages),
      });

      setMessage(`Image assigned to slot: ${slotKey}`);
      setTimeout(() => setMessage(""), 3000);
    } catch (e) {
      console.error("Assignment error:", e);
      alert("Failed to assign slot");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <ImageIcon className="w-6 h-6 text-blue-500" />
            Media & Images Manager
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload, manage, and assign images to any placeholder on the TIUM website.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={loadMedia}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            title="Refresh library"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading Media...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload New Images
              </>
            )}
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Info notice */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/20 flex items-start gap-3 text-slate-300 text-xs">
        <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-white">How Image Assignment Works</p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Upload images from your device or use URLs. Every placeholder on the website (Hero, Introduction, About, Services, Industries, Contact) can display an uploaded image or fallback to the elegant themed gradient placeholder when none is set.
          </p>
        </div>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="py-20 text-center text-xs font-mono text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-500" />
          Loading media library...
        </div>
      ) : mediaList.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-slate-800 rounded-2xl bg-slate-950/50 p-8 space-y-3">
          <FolderOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-semibold text-white">No images uploaded yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Upload photos from your computer to replace placeholders across the homepage, about, and services pages.
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
          >
            Upload Your First Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaList.map((item) => (
            <div
              key={item.filename}
              className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col group hover:border-blue-500/40 transition-all shadow-md"
            >
              {/* Image preview */}
              <div className="relative aspect-video bg-slate-900 overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.filename}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white/80 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Open full size"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Details & controls */}
              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-white truncate" title={item.filename}>
                    {item.filename}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{formatFileSize(item.size)}</span>
                    <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Quick Assign Dropdown */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase">
                    Quick Assign To Slot:
                  </label>
                  <select
                    value={assigningTo[item.filename] || ""}
                    onChange={(e) => {
                      const slot = e.target.value;
                      setAssigningTo({ ...assigningTo, [item.filename]: slot });
                      if (slot) handleAssignSlot(item.url, slot);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg text-[11px] p-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select slot to assign...</option>
                    <option value="hero">Homepage Hero Image</option>
                    <option value="intro">Homepage Who We Are Photo</option>
                    <option value="aboutPreview">Homepage About Preview Photo</option>
                    <option value="missionVision">Homepage Mission & Vision</option>
                    <option value="dualCtaEmployer">Homepage Employer CTA Card</option>
                    <option value="dualCtaCandidate">Homepage Candidate CTA Card</option>
                    <option value="aboutStory">About Page Austin Story Photo</option>
                    <option value="contactOffice">Contact Page HQ Office Photo</option>
                  </select>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.url)}
                      className="text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {copiedUrl === item.url ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy URL
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.filename)}
                      className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
