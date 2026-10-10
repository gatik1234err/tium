"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Check, Loader2, Sparkles } from "lucide-react";

interface ImageUploadFieldProps {
  label: string;
  description?: string;
  value?: string;
  onChange: (url: string) => void;
  aspectHint?: string;
  placeholderText?: string;
}

export function ImageUploadField({
  label,
  description,
  value,
  onChange,
  aspectHint = "Recommended: Landscape 16:9 or 4:3",
  placeholderText = "Default themed gradient placeholder will be shown if empty",
}: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState(value || "");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      onChange(data.url);
      setUrlInput(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error uploading image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleApplyUrl = () => {
    onChange(urlInput.trim());
    setShowUrlInput(false);
  };

  const handleClear = () => {
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <label className="block text-xs font-semibold text-slate-200">{label}</label>
          {description && <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>}
        </div>
        <span className="text-[10px] font-mono text-slate-500">{aspectHint}</span>
      </div>

      {error && (
        <div className="text-[11px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1.5 rounded">
          {error}
        </div>
      )}

      {/* Preview and controls */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview box */}
        <div className="sm:col-span-5 h-36 rounded-lg border border-slate-700/80 bg-slate-950 relative overflow-hidden flex items-center justify-center group">
          {value ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-1 text-xs rounded bg-red-600/90 text-white font-medium hover:bg-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Remove image and revert to styled placeholder"
                >
                  <X className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-1.5 text-blue-400">
                <ImageIcon className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-medium text-slate-400">No Custom Image</p>
              <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{placeholderText}</p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="sm:col-span-7 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id={`upload-${label.replace(/\s+/g, "-")}`}
            />

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow shadow-blue-600/30 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  Upload from Device
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              {showUrlInput ? "Hide URL Input" : "Paste Image URL"}
            </button>

            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="px-2.5 py-2 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Collapsible URL input */}
          {showUrlInput && (
            <div className="flex items-center gap-1.5 pt-1 animate-in fade-in">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/image.jpg or /uploads/..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}

          {value && (
            <div className="text-[10px] text-slate-400 font-mono truncate max-w-sm">
              Current Source: <span className="text-blue-400">{value}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
