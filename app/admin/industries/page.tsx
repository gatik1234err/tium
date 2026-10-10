"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Factory,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { IndustryItem } from "@/lib/types";

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndustry, setEditingIndustry] = useState<Partial<IndustryItem>>({});
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [specInput, setSpecInput] = useState("");
  const [roleInput, setRoleInput] = useState("");

  const loadIndustries = async () => {
    try {
      const res = await fetch("/api/admin/industries");
      const data = await res.json();
      setIndustries(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIndustries();
  }, []);

  const openNewModal = () => {
    const nextNum = String(industries.length + 1).padStart(2, "0");
    setEditingIndustry({
      id: "",
      number: nextNum,
      name: "",
      slug: "",
      tagline: "",
      subtitle: "",
      overview: "",
      marketInsights: "",
      specializations: [],
      keyRoles: [],
      stats: [
        { label: "Placements", value: "1,000+" },
        { label: "Time to Shortlist", value: "48 hrs" },
      ],
      accentColor: "from-blue-600/30 to-indigo-900/40",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ind: IndustryItem) => {
    setEditingIndustry({ ...ind });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIndustry.name || !editingIndustry.overview) return;

    setSubmitting(true);
    const isEdit = Boolean(editingIndustry.id);

    try {
      const res = await fetch("/api/admin/industries", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingIndustry),
      });

      if (!res.ok) throw new Error("Failed to save industry");
      await loadIndustries();
      setIsModalOpen(false);
      setFeedback(isEdit ? "Industry updated!" : "Industry created!");
      setTimeout(() => setFeedback(""), 3500);
    } catch {
      alert("Error saving industry.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete industry vertical: "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/industries?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed");
      await loadIndustries();
      setFeedback("Industry deleted.");
      setTimeout(() => setFeedback(""), 3000);
    } catch {
      alert("Error deleting industry.");
    }
  };

  const filtered = industries.filter((i) => {
    const q = search.toLowerCase().trim();
    return !q || i.name.toLowerCase().includes(q) || i.overview.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2.5">
            <Factory className="w-6 h-6 text-blue-500" />
            Industry Sectors & Practices
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage industry verticals (Technology, Healthcare, Automobiles, Aeronautics, etc.).
          </p>
        </div>

        <button
          type="button"
          onClick={openNewModal}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Sector
        </button>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-400 font-mono">Loading sectors...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-300">No industry sectors found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] uppercase font-mono text-slate-500 bg-slate-900/50">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Practice Name & Slug</th>
                  <th className="py-3 px-4">Subtitle</th>
                  <th className="py-3 px-4">Specializations</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filtered.map((ind) => (
                  <tr key={ind.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-500">{ind.number}</td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white text-sm">{ind.name}</div>
                      <div className="text-[11px] font-mono text-slate-500">/industries/{ind.slug}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{ind.subtitle}</td>
                    <td className="py-4 px-4 font-mono text-slate-300">
                      {ind.specializations?.length || 0} specializations
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/industries/${ind.slug}`}
                          target="_blank"
                          title="Preview"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => openEditModal(ind)}
                          className="p-1.5 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(ind.id, ind.name)}
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
                {editingIndustry.id ? "Edit Practice Vertical" : "Add Practice Vertical"}
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
                    value={editingIndustry.number || "01"}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, number: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-400 font-semibold mb-1">Industry Name</label>
                  <input
                    type="text"
                    required
                    value={editingIndustry.name || ""}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                      setEditingIndustry({
                        ...editingIndustry,
                        name,
                        slug: editingIndustry.id ? editingIndustry.slug : slug,
                      });
                    }}
                    placeholder="e.g. Aeronautics"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Slug</label>
                  <input
                    type="text"
                    value={editingIndustry.slug || ""}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, slug: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={editingIndustry.subtitle || ""}
                    onChange={(e) => setEditingIndustry({ ...editingIndustry, subtitle: e.target.value })}
                    placeholder="e.g. Defense & Commercial Aviation"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={editingIndustry.tagline || ""}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, tagline: e.target.value })}
                  placeholder="One sentence summary..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              {/* Industry Image / Sector Photo Uploader */}
              <ImageUploadField
                label="Industry Sector Photo / Illustration"
                description="Displays in the industry card on the homepage and detail header"
                value={editingIndustry.imageUrl || ""}
                onChange={(url) => setEditingIndustry({ ...editingIndustry, imageUrl: url })}
                aspectHint="Recommended: 16:9 Landscape"
              />

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingIndustry.overview || ""}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, overview: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Market Insights</label>
                <textarea
                  rows={2}
                  value={editingIndustry.marketInsights || ""}
                  onChange={(e) => setEditingIndustry({ ...editingIndustry, marketInsights: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
                />
              </div>

              {/* Specializations list */}
              <div className="space-y-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-slate-300 font-semibold">Specializations</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={specInput}
                    onChange={(e) => setSpecInput(e.target.value)}
                    placeholder="Add specialization..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (specInput.trim()) {
                        setEditingIndustry({
                          ...editingIndustry,
                          specializations: [...(editingIndustry.specializations || []), specInput.trim()],
                        });
                        setSpecInput("");
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(editingIndustry.specializations || []).map((spec, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-slate-200"
                    >
                      <span>{spec}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingIndustry({
                            ...editingIndustry,
                            specializations: editingIndustry.specializations?.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
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
                  {submitting ? "Saving..." : "Save Industry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
