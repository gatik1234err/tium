"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import type { ServiceItem } from "@/lib/types";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Partial<ServiceItem>>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Array inputs
  const [benefitInput, setBenefitInput] = useState("");
  const [capInput, setCapInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [metricLabel, setMetricLabel] = useState("");
  const [metricValue, setMetricValue] = useState("");

  const loadServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openNewModal = () => {
    const nextNum = String(services.length + 1).padStart(2, "0");
    setEditingService({
      id: "",
      number: nextNum,
      title: "",
      shortTitle: "",
      slug: "",
      tagline: "",
      description: "",
      fullOverview: "",
      benefits: [],
      capabilities: [],
      process: [],
      metrics: [],
      roles: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingService({ ...s });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService.title || !editingService.description) return;

    setSubmitting(true);
    const isEdit = Boolean(editingService.id);

    try {
      const res = await fetch("/api/admin/services", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingService),
      });

      if (!res.ok) throw new Error("Failed to save service");
      await loadServices();
      setIsModalOpen(false);
      setFeedback(isEdit ? "Service updated successfully!" : "Service created successfully!");
      setTimeout(() => setFeedback(""), 3500);
    } catch {
      alert("Error saving service.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete service: "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      await loadServices();
      setFeedback("Service deleted.");
      setTimeout(() => setFeedback(""), 3000);
    } catch {
      alert("Error deleting service.");
    }
  };

  const filtered = services.filter((s) => {
    const q = search.toLowerCase().trim();
    return !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-blue-500" />
            Workforce Solutions & Services
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage offerings (RPO, Contingent Staffing, Direct Hire, etc.), metrics, and delivery models.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Search */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400 font-mono">Loading services...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-300">No services found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase font-mono text-slate-500 bg-slate-900/50">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Service Title & Slug</th>
                  <th className="py-3 px-4">Tagline</th>
                  <th className="py-3 px-4">Benefits Count</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-500">{s.number}</td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white text-sm">{s.title}</div>
                      <div className="text-[11px] font-mono text-slate-500">/services/{s.slug}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-400 max-w-xs truncate">{s.tagline}</td>
                    <td className="py-4 px-4 font-mono text-slate-300">
                      {s.benefits?.length || 0} benefits • {s.metrics?.length || 0} metrics
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/services/${s.slug}`}
                          target="_blank"
                          title="Preview"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(s)}
                          className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id, s.title)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
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

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-200">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-lg font-bold font-display text-white">
                {editingService.id ? "Edit Service" : "Add New Service"}
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Index Number</label>
                  <input
                    type="text"
                    value={editingService.number || "01"}
                    onChange={(e) => setEditingService({ ...editingService, number: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Full Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService.title || ""}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                      setEditingService({
                        ...editingService,
                        title,
                        slug: editingService.id ? editingService.slug : slug,
                      });
                    }}
                    placeholder="e.g. Recruitment Process Outsourcing"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Short Title / Acronym</label>
                  <input
                    type="text"
                    value={editingService.shortTitle || ""}
                    onChange={(e) => setEditingService({ ...editingService, shortTitle: e.target.value })}
                    placeholder="e.g. RPO"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Slug</label>
                  <input
                    type="text"
                    value={editingService.slug || ""}
                    onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingService.tagline || ""}
                  onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                  placeholder="One sentence value proposition..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Summary Description</label>
                <textarea
                  rows={2}
                  value={editingService.description || ""}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Full Overview Description</label>
                <textarea
                  rows={4}
                  value={editingService.fullOverview || ""}
                  onChange={(e) => setEditingService({ ...editingService, fullOverview: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
                />
              </div>

              {/* Benefits list */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-slate-300 font-semibold">Core Benefits</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={benefitInput}
                    onChange={(e) => setBenefitInput(e.target.value)}
                    placeholder="Add benefit..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (benefitInput.trim()) {
                        setEditingService({
                          ...editingService,
                          benefits: [...(editingService.benefits || []), benefitInput.trim()],
                        });
                        setBenefitInput("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1 pt-1">
                  {(editingService.benefits || []).map((b, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-900 text-slate-300">
                      <span>{b}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingService({
                            ...editingService,
                            benefits: editingService.benefits?.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-red-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  {submitting ? "Saving..." : "Save Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
