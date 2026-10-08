"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  Download,
  Upload,
  RotateCcw,
  Save,
  Check,
  AlertCircle,
  Lock,
  Building2,
} from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      setSettings(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error("Failed");
      setFeedback("Company settings updated successfully!");
      setTimeout(() => setFeedback(""), 3500);
    } catch {
      alert("Error saving settings.");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
      return;
    }

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change_password",
          currentPassword,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setPasswordError(data.error || "Failed to update password.");
        return;
      }

      setPasswordSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordSuccess(""), 4000);
    } catch {
      setPasswordError("Error connecting to server.");
    }
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm("Restoring from backup will overwrite current content. Proceed?")) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });

      if (!res.ok) throw new Error("Failed to restore backup");
      alert("Backup successfully restored! Refreshing page...");
      window.location.reload();
    } catch {
      alert("Invalid JSON backup file or restore failed.");
    }
  };

  if (loading || !settings) {
    return (
      <div className="py-20 text-center text-xs font-mono text-slate-400">
        Loading site settings...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-blue-500" />
          Settings & Data Management
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage corporate identity, administrator credentials, and database backups.
        </p>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* ── Section 1: Corporate Identity ── */}
      <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Building2 className="w-4 h-4 text-blue-400" />
          <h2 className="font-semibold text-white text-sm font-display">Corporate Identity & Contact Info</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Company Name</label>
            <input
              type="text"
              value={settings.companyName}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Corporate Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Contact Phone</label>
            <input
              type="text"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Contact Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 font-semibold mb-1">HQ Address</label>
          <input
            type="text"
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={settings.socials?.linkedin || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socials: { ...settings.socials, linkedin: e.target.value },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px]"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Twitter / X URL</label>
            <input
              type="text"
              value={settings.socials?.twitter || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socials: { ...settings.socials, twitter: e.target.value },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px]"
            />
          </div>
          <div>
            <label className="block text-slate-400 font-semibold mb-1">GitHub URL</label>
            <input
              type="text"
              value={settings.socials?.github || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socials: { ...settings.socials, github: e.target.value },
                })
              }
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-[11px]"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Save Identity Settings
          </button>
        </div>
      </form>

      {/* ── Section 2: Admin Security & Password Change ── */}
      <form onSubmit={handlePasswordChange} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Lock className="w-4 h-4 text-blue-400" />
          <h2 className="font-semibold text-white text-sm font-display">Administrator Security & Password</h2>
        </div>

        {passwordError && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{passwordError}</span>
          </div>
        )}

        {passwordSuccess && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-white"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-2 cursor-pointer border border-slate-700"
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            Update Password
          </button>
        </div>
      </form>

      {/* ── Section 3: Data Backup & Restore ── */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Download className="w-4 h-4 text-blue-400" />
          <h2 className="font-semibold text-white text-sm font-display">Database Backup & Recovery</h2>
        </div>

        <p className="text-slate-400 leading-relaxed">
          Export the entire website data store (all jobs, services, industries, text content, cookie preferences, and terms of service) as a single portable JSON file. You can restore this data anytime.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href="/api/admin/backup"
            download
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2 shadow-md shadow-blue-600/30"
          >
            <Download className="w-4 h-4" />
            Download Complete Backup (.json)
          </a>

          <label className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer">
            <Upload className="w-4 h-4 text-sky-400" />
            Restore From Backup (.json)
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreFile}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
