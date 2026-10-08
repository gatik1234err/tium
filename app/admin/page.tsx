"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Briefcase,
  Layers,
  Factory,
  ShieldAlert,
  Inbox,
  ArrowRight,
  Plus,
  Download,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Settings,
} from "lucide-react";
import type { JobListing, ServiceItem, IndustryItem, InquiryItem, LegalData } from "@/lib/types";

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [legal, setLegal] = useState<LegalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/jobs").then((r) => r.json()),
      fetch("/api/admin/services").then((r) => r.json()),
      fetch("/api/admin/industries").then((r) => r.json()),
      fetch("/api/admin/inquiries").then((r) => r.json()),
      fetch("/api/admin/legal").then((r) => r.json()),
    ])
      .then(([jobsData, servicesData, industriesData, inquiriesData, legalData]) => {
        setJobs(Array.isArray(jobsData) ? jobsData : []);
        setServices(Array.isArray(servicesData) ? servicesData : []);
        setIndustries(Array.isArray(industriesData) ? industriesData : []);
        setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
        setLegal(legalData || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard data load error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-slate-400">Loading control dashboard metrics...</p>
      </div>
    );
  }

  const newInquiriesCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-8">
      {/* ── Welcome Banner ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-950/40 p-6 sm:p-8 rounded-2xl border border-blue-500/20 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            TIUM Full Control Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            TIUM Website Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Manage all job listings, services, industries, text content, cookie banners, terms & conditions popouts, and incoming leads without modifying source code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            href="/admin/jobs?action=new"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </Link>
          <a
            href="/api/admin/backup"
            download
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-sky-400" />
            Backup Site Data
          </a>
        </div>
      </div>

      {/* ── Stat Metric Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Jobs */}
        <Link
          href="/admin/jobs"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-950 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-mono uppercase">Active Jobs</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold font-display text-white">{jobs.length}</p>
          <p className="text-[11px] text-slate-400 mt-1">Manage positions & requisitions →</p>
        </Link>

        {/* Inquiries */}
        <Link
          href="/admin/inquiries"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-950 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-mono uppercase">Total Inquiries</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold font-display text-white">{inquiries.length}</p>
            {newInquiriesCount > 0 && (
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {newInquiriesCount} new
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Candidate & client messages →</p>
        </Link>

        {/* Services & Industries */}
        <Link
          href="/admin/services"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-950 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-mono uppercase">Services & Sectors</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold font-display text-white">
            {services.length} <span className="text-sm font-normal text-slate-400">/ {industries.length}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">{services.length} services • {industries.length} industries →</p>
        </Link>

        {/* Compliance / Terms */}
        <Link
          href="/admin/legal"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-950 transition-all group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-mono uppercase">Legal & Compliance</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-display text-white">
            Version {legal?.terms.version || "2.1"}
          </p>
          <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            Popout & Cookies Active →
          </p>
        </Link>
      </div>

      {/* ── Legal & Compliance Status Card ── */}
      {legal && (
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
              <h2 className="font-semibold text-white font-display text-base">
                Compliance & Legal Modules Status
              </h2>
            </div>
            <Link
              href="/admin/legal"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Configure in Legal Editor <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Cookies Consent Status */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Cookie Consent Banner</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                  legal.cookies.enabled
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}>
                  {legal.cookies.enabled ? "Active" : "Disabled"}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] line-clamp-2">
                {legal.cookies.message}
              </p>
              <div className="pt-1 text-[10px] text-slate-500 font-mono">
                Accept text: &quot;{legal.cookies.acceptAllText}&quot; • Policy URL: {legal.cookies.policyUrl}
              </div>
            </div>

            {/* Terms Popout Status */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Terms & Conditions Popout</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                  legal.terms.enabled
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-300 border border-red-500/30"
                }`}>
                  {legal.terms.enabled ? `Active (v${legal.terms.version})` : "Disabled"}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] line-clamp-2">
                Trigger mode: <strong className="text-slate-200 uppercase font-mono">{legal.terms.modalTrigger}</strong> • Requires checkbox agreement.
              </p>
              <div className="pt-1 text-[10px] text-slate-500 font-mono">
                Checkbox: &quot;{legal.terms.checkboxLabel.slice(0, 50)}...&quot;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Recent Inquiries Table ── */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Inbox className="w-5 h-5 text-blue-400" />
            <h2 className="font-semibold text-white font-display text-base">
              Recent Inquiries & Applications
            </h2>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            View All ({inquiries.length}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            No inquiries received yet. Submissions from Contact Form or Job Applications will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase font-mono text-slate-500">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Applicant / Client</th>
                  <th className="py-2.5 px-3">Type / Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-white">{inq.fullName}</div>
                      <div className="text-[11px] text-slate-400">{inq.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-slate-200">
                        {inq.jobTitle || inq.intent || (inq.type === "job_application" ? "Career Application" : "General Inquiry")}
                      </span>
                      {inq.company && (
                        <div className="text-[11px] text-slate-400">{inq.company}</div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          inq.status === "new"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : inq.status === "reviewed"
                            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/admin/inquiries?id=${inq.id}`}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Quick Admin Modules Shortcuts ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/pages"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white font-display group-hover:text-blue-400 transition-colors">
              Page Content Editor
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Edit homepage hero headline, stats, about story, why-tium metrics and contact information.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/reasons"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white font-display group-hover:text-blue-400 transition-colors">
              Why TIUM & Values
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Customize the 8 core pillars of excellence, company values, and mission statements.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-white font-display group-hover:text-blue-400 transition-colors">
              Settings & Backups
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Export complete JSON backup, restore data, update company address, phone, and admin passwords.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
