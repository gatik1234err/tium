"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  CheckCircle2,
  Trash2,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Clock,
  Download,
  X,
  Eye,
} from "lucide-react";
import type { InquiryItem } from "@/lib/types";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  const loadInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryItem["status"]) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
      const updated = inquiries.map((i) => (i.id === id ? { ...i, status: newStatus } : i));
      setInquiries(updated);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch {
      alert("Error updating status.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry record?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      setInquiries(inquiries.filter((i) => i.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) setSelectedInquiry(null);
    } catch {
      alert("Error deleting inquiry.");
    }
  };

  const exportInquiries = () => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiries, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `tium-inquiries-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filtered = inquiries.filter((inq) => {
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      inq.fullName.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.jobTitle && inq.jobTitle.toLowerCase().includes(q)) ||
      inq.message.toLowerCase().includes(q);

    const matchesStatus = filterStatus === "all" || inq.status === filterStatus;
    const matchesType = filterType === "all" || inq.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <Inbox className="w-6 h-6 text-blue-500" />
            Inquiries & Job Applications
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review incoming leads, corporate staffing consultation requests, and candidate job applications.
          </p>
        </div>

        <button
          type="button"
          onClick={exportInquiries}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-sky-400" />
          Export JSON
        </button>
      </div>

      {/* Search & Filters */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, company, job role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Types</option>
            <option value="contact">Contact Inquiry</option>
            <option value="job_application">Job Application</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400 font-mono">Loading leads...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-300">No inquiry messages found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase font-mono text-slate-500 bg-slate-900/50">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Intent / Role</th>
                  <th className="py-3 px-4">Message Snippet</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white">{inq.fullName}</div>
                      <div className="text-[11px] text-slate-400">{inq.email}</div>
                      {inq.company && <div className="text-[11px] text-blue-400">{inq.company}</div>}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-slate-200">
                        {inq.jobTitle || inq.intent || (inq.type === "job_application" ? "Application" : "Contact")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 max-w-xs truncate">{inq.message}</td>
                    <td className="py-4 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq.id, e.target.value as InquiryItem["status"])
                        }
                        className={`text-[10px] font-mono font-semibold uppercase px-2 py-1 rounded bg-slate-900 border ${
                          inq.status === "new"
                            ? "text-blue-300 border-blue-500/30"
                            : inq.status === "reviewed"
                            ? "text-amber-300 border-amber-500/30"
                            : "text-slate-400 border-slate-700"
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 cursor-pointer"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-5 text-xs text-slate-300 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-blue-400 font-semibold">
                  {selectedInquiry.type === "job_application" ? "Career Candidate Application" : "Direct Contact Submission"}
                </span>
                <h3 className="text-base font-bold text-white font-display mt-0.5">
                  {selectedInquiry.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${selectedInquiry.email}`} className="text-blue-400 underline truncate">
                  {selectedInquiry.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{selectedInquiry.phone || "No phone provided"}</span>
              </div>
              {selectedInquiry.company && (
                <div className="flex items-center gap-2 col-span-2">
                  <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Company: <strong className="text-white">{selectedInquiry.company}</strong></span>
                </div>
              )}
              {selectedInquiry.jobTitle && (
                <div className="flex items-center gap-2 col-span-2">
                  <Briefcase className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Applied For: <strong className="text-white">{selectedInquiry.jobTitle}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2 col-span-2 text-slate-500 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Received: {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300">Message / Application Note:</label>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedInquiry.id, e.target.value as InquiryItem["status"])
                  }
                  className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
                >
                  <option value="new">New</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
